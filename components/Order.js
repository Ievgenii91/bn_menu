import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

let paymentEndpoint = '/api/payment';

export default function Order({ order, remove }) {
    const [data, setData] = useState()
    const [signature, setSignature] = useState()
    const form = useRef(null)

    useEffect(() => {
        if(data && signature) {
            form.current.submit();
        }
    }, [data, signature])

    const getAmount = () => {
        let total = 0;
        if(!order || !order.selectedItems) {
            return total;
        }
        order.selectedItems.forEach(element => {
            total+=parseInt(element.price * (element.count || 1), 0)
        });
        return total;
    }

    const submit = async (amount) => {
        if(!amount) {
          console.error('amount cant be null or 0', amount);
          return;
        }
        try {
          const response = await fetch(paymentEndpoint, { method: 'POST', body: JSON.stringify({ amount }) });
          const { data, signature } = await response.json()
          setData(data);
          setSignature(signature);          
        } catch(e) {
          console.error(e);
        }
      }

    return (
        <div className={styles.orderWrapper}>
            Моє замовлення:
            {
                order?.selectedItems.map((v, id) => {        
                    const dup = v.count > 1;  
                    const price = v.price * (v.count || 1);          
                    return (
                        <div className={styles.orderProduct} key={id + 'h'}>
                            {dup && (v.count + ' шт ')}
                            {v.name + ' + ' }
                            <b>{price}₴</b>
                            <div className={styles.cross} onClick={() => remove(v)}>
                                <Image src="/cross.svg" width={20} height={20} />
                            </div>                            
                        </div>
                    )                  
                })
            }
            <div>
            <form ref={form} method="POST" action="https://www.liqpay.ua/api/3/checkout">
                <input type="hidden" name="data" value={data}/>
                <input type="hidden" name="signature" value={signature}/>
            </form>
            </div>
            <div>
                Всього: {getAmount() + '₴'}
            </div>
            <div className={styles.paymentBlock}>
                <button type="button" className={styles.pay} onClick={() => submit(getAmount())}>ЗАМОВИТИ</button>
            </div>
        </div>
    )
}