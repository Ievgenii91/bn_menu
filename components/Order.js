import { useEffect, useRef, useState } from 'react';
import InputMask from 'react-input-mask';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import classNames from 'classnames';

let paymentEndpoint = '/api/payment';
const phoneNumLength = 10;

export default function Order({ order, remove }) {
  const [data, setData] = useState();
  const [signature, setSignature] = useState();
  const [clientName, setClientName] = useState('');
  const [isValidName, setIsValidName] = useState(true);

  const [phone, setPhone] = useState('');
  const [isValidPhone, setIsValidPhone] = useState(true);

  const [note, setNote] = useState();
  const form = useRef(null);

  useEffect(() => {
    if (data && signature) {
      localStorage.setItem('order', JSON.stringify({
        phone,
        clientName,
        note,
        date: new Date().getTime() + ''
      }))
      form.current.submit();
    }
  }, [data, signature]);

  const getAmount = () => {
    let total = 0;
    if (!order || !order.selectedItems) {
      return total;
    }
    order.selectedItems.forEach((element) => {
      total += parseInt(element.price * (element.count || 1), 0);
    });
    return total;
  };

  const transformPhoneNumber = (phone) => {
    phone = phone.replace('+38(', '')
    phone = phone.replace(/-/g, '')
    phone = phone.replace(')', '')
    return phone.trim()
  }

  const validate = () => {
    let isValid = true;
    if (!clientName) {
      setIsValidName(false);
      isValid = false;
    }    
    if (!phone || transformPhoneNumber(phone).length !== phoneNumLength) {
      setIsValidPhone(false);
      isValid = false;
    }
    return isValid;
  };

  const submit = async (amount) => {
    if (!validate()) {
      return;
    }
    if (!amount) {
      console.error('amount cant be null or 0', amount);
      return;
    }
    try {
      const response = await fetch(paymentEndpoint, {
        method: 'POST',
        body: JSON.stringify({ amount, description: 'website payment' }),
      });
      const { data, signature } = await response.json();
      setData(data);
      setSignature(signature);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className={styles.orderWrapper}>
      <h4>Моє замовлення:</h4>
      <div className={styles.orderListWrap}>
        {order?.selectedItems.map((v, id) => {
          const dup = v.count > 1;
          const price = v.price * (v.count || 1);
          return (
            <div className={styles.orderProduct} key={id + 'h'}>
              {dup && v.count + ' шт '}
              {v.name + ' + '}
              <b>{price}₴</b>
              <div className={styles.cross} onClick={() => remove(v)}>
                <Image src="/cross.svg" width={20} height={20} />
              </div>
            </div>
          );
        })} 
      </div>                 
      <div className={classNames(styles.row, { [styles.error]: !isValidName })}>
        <input
          type="text"
          value={clientName}
          onChange={(e) => {
            setIsValidName(true);
            setClientName(e.target.value);
          }}
          placeholder="*Ім'я"
          className={classNames(styles.styledInput, styles.phone, {
            [styles.error]: !isValidName,
          })}
        />
        {!isValidName && (
          <span className={styles.validationError}>
            Це поле обов'язкове для заповнення
          </span>
        )}
      </div>
      <div className={classNames(styles.row, { [styles.error]: !isValidPhone })}>
        <InputMask value={phone} onChange={(e) => {
            setIsValidPhone(true);
            setPhone(e.target.value);
          }} 
          placeholder="*Номер телефону"
          className={classNames(styles.styledInput, styles.phone, {
            [styles.error]: !isValidPhone,
          })}
          mask="+38(999)-999-99-99" maskChar=" " />
        {!isValidPhone && (
          <span className={styles.validationError}>
            Це поле обов'язкове для заповнення
          </span>
        )}
      </div>
      <div className={styles.row}>
        <textarea
          value={note}
          onChange={(e) => {
            setNote(e.target.value);
          }}
          placeholder="Примітка до замовлення"
          className={classNames(styles.styledInput, styles.notes)}
        ></textarea>
      </div>
      <h5 className={styles.totalCount}>Всього: {getAmount() + '₴'}</h5>        
      <div className={classNames(styles.paymentBlock, styles.row)}>
        <form
          ref={form}
          method="POST"
          action="https://www.liqpay.ua/api/3/checkout"
        >
          <input type="hidden" name="data" value={data} />
          <input type="hidden" name="signature" value={signature} />
        </form>
        <button
          type="button"
          className={styles.pay}
          onClick={() => submit(getAmount())}
        >
          ЗАМОВИТИ
        </button>
      </div>
    </div>
  );
}
