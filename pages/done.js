import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import PageHead from '../components/PageHead';
import Header from '../components/Header';
import styles from '../styles/Home.module.css';
import Link from 'next/link';
import classNames from 'classnames';
import notifyMe from '../services/notification';

export default function Done() {
  const [finished, showFinished] = useState(false);

  const isConnectedToApi = () => {
    return !!process.env.NEXT_PUBLIC_EXTERNAL_API;
  };

  useEffect(async () => {

    if(localStorage.getItem('finished')) {
      showFinished(true);
    }

    const socket = io(process.env.NEXT_PUBLIC_EXTERNAL_API, {
      query: {
        clientId: process.env.NEXT_PUBLIC_ENTITY_CLIENT_ID
      }
    });

    // client-side
    socket.on('connect', () => {

      socket.on('finish_order', (data) => {
        notifyMe('Забирай замовлення на видачі!')
        showFinished(true);
        localStorage.setItem('finished', data.id);
      })
      
    });

    let order = localStorage.getItem('order');
    if (order) {
      order = JSON.parse(order);  
      let data = {
        clientId: process.env.NEXT_PUBLIC_ENTITY_CLIENT_ID,
        name: order.clientName,
        phone: order.phone,
        products: order.products,
      };      
      await fetch(
        process.env.NEXT_PUBLIC_EXTERNAL_API + '/api/order',
        {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );      
      localStorage.clear();
    } else {
      console.log('order has already been sent')
    }
  }, []);

  return (
    <>
      <PageHead />
      <Header showHint={isConnectedToApi()} />
      <main className={classNames(styles.main, styles.column)}>
        { !finished && <p className={styles.finishText}>
        Замовлення успішно оплачене, чекайте повідомлення про виконання!
        </p>}
        { finished && (<>
          <p className={classNames(styles.finishText, styles.highlight)}>Замовлення виконано!</p>
          <p className={classNames(styles.finishText, styles.highlight)}>Забирай на видачі!</p>
          </>
        )}

          <div className={styles.finishText}>
            <Link href="/"><button type="button" className={classNames(styles.pay, styles.done)}>Повернутись до меню</button></Link>
          </div>
      </main>
      <footer></footer>
    </>
  );
}
