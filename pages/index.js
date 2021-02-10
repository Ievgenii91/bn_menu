import { useState, useRef } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import useSWR from 'swr';
import StaticMenu from '../components/StaticMenu';
import DynamicMenu from '../components/DynamicMenu';
import styles from '../styles/Home.module.css';
import Order from '../components/Order';
import classNames from 'classnames';
import { useSwipeable } from 'react-swipeable';

const { NEXT_PUBLIC_EXTERNAL_API, ENTITY_CLIENT_ID } = process.env;
let trackEndpoint = '/api/user';

const getData = async () => {
  const fetchData = async () => {
    window.localStorage.setItem('lastUpdated', new Date().toISOString());
    const response = await fetch(trackEndpoint);
    return await response.json();
  };

  let lastUpdated = window.localStorage.getItem('lastUpdated');
  if (lastUpdated) {
    let currentTime = new Date(new Date().toISOString()).getTime();
    if (currentTime - new Date(lastUpdated).getTime() > 300000) {
      return await fetchData();
    } else {
      return new Promise.resolve(false);
    }
  } else {
    return await fetchData();
  }
};

export default function Home({ products }) {
  const { data, error } = useSWR(trackEndpoint, getData, {
    dedupingInterval: 60000,
  });
  const orderRef = useRef();
  const [order, setOrder] = useState(null)
  const [swiped, setSwiped] = useState(false)
  const [pos, setPos] = useState(0)
  const handlers = useSwipeable({
    onSwiped: () => {
      setPos(0)
    },
    onSwipedDown: () => {
      setSwiped(false);
    },
    onSwipedUp: () => {
      setSwiped(true);
    },
    onSwiping: ({ deltaY, dir }) => {
      if(dir === 'Up') {
        setPos(deltaY)
      }      
    },
  });

  const isConnectedToApi = () => {
    return !!NEXT_PUBLIC_EXTERNAL_API;
  };

  const selectProduct = (product) => {
    setOrder((order) => {    
      let dup = null;
      let products = [];
      if(order) {
        products = order.selectedItems.map(v => {
          if(v.id === product.id) {
            dup = true;
            v.count = (v.count || 1) + 1;
          }
          return {
            ...v
          }
        })        
      }
      if(!dup) {
        products.push({
          ...product,
          count: 1
        })
      }
      return {
        ...order,
        selectedItems: products
      }
    })
  }

  const remove = (product) => {
    const index = order.selectedItems.findIndex(v => v.id === product.id)
    order.selectedItems.splice(index, 1);
    if(!order.selectedItems.length) {
      setOrder(null)
    } else {      
      setOrder({
        ...order
      })
    }
  }

  const refPassthrough = (el) => {
    handlers.ref(el);
    orderRef.current = el;
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>БІЛИЙ НАЛИВ меню</title>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Anonymous+Pro&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@300&display=swap"
          rel="stylesheet"
        ></link>
        <link rel="icon" href="/favicon.ico" />
        
      </Head>
      {isConnectedToApi() && (
        <div className={styles.preHeader}>
          Привіт, грішнику! Усі наіменування клікабельні, можеш робити
          замовлення прямо з сайту.
        </div>
      )}
      <div className={styles.header}>
        <Image
          className={styles.logo}
          src="/logo.svg"
          alt="БІЛИЙ НАЛИВ"
          width={500}
          height={280}
        />
      </div>
      { order && (
        <div 
          className={classNames(styles.miniCart, { [styles.show]: !!order, [styles.swiped]: swiped })}
          style={{ top: pos + 'px'}}
          ref={refPassthrough}
          {...handlers}>
          <div className={styles.rotatedBlock}></div>
          <Order order={order} remove={remove} />
        </div>
      )}      
      <main className={styles.main}>
        {
          !isConnectedToApi() && <StaticMenu/>
        }
        {
          isConnectedToApi() && <DynamicMenu products={products} selectProduct={selectProduct} />
        }
      </main>
    </div>
  );
}

export async function getStaticProps() {
  if (NEXT_PUBLIC_EXTERNAL_API) {
    const res = await fetch(
      `${NEXT_PUBLIC_EXTERNAL_API}/api/products/getPublicProducts?clientId=${ENTITY_CLIENT_ID}`
    );
    const data = await res.json();

    if (!data) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        products: data.products,
      },
    };
  } else {
    return {
      props: {},
    };
  }
}
