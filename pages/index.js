import { useState, useRef } from 'react';
import useSWR from 'swr';
import Link from 'next/link';
import classNames from 'classnames';
import { useSwipeable } from 'react-swipeable';
import StaticMenu from '../components/StaticMenu';
import DynamicMenu from '../components/DynamicMenu';
import Header from '../components/Header';
import PageHead from '../components/PageHead';
import styles from '../styles/Home.module.css';
import Order from '../components/Order';

const { NEXT_PUBLIC_EXTERNAL_API, ENTITY_CLIENT_ID } = process.env;
const trackEndpoint = '/api/user?zone=';
const QR_SCAN_FREQUENCY_TIMEOUT = 60000; // 1 min

const getData = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const storage = window.localStorage;
  const zone = urlParams.get('zone');

  const fetchData = async () => {
    storage.setItem('lastUpdated', new Date().toISOString());
    const response = await fetch(trackEndpoint + zone);
    return await response.json();
  };

  let lastUpdated = storage.getItem('lastUpdated');
  if (lastUpdated) {
    let currentTime = new Date(new Date().toISOString()).getTime();
    if (currentTime - new Date(lastUpdated).getTime() > QR_SCAN_FREQUENCY_TIMEOUT) {
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
  const [order, setOrder] = useState(null);
  const [swiped, setSwiped] = useState(false);
  const [pos, setPos] = useState(0);
  const handlers = useSwipeable({
    onSwiped: () => {
      setPos(0);
    },
    onSwipedDown: () => {
      setSwiped(false);
    },
    onSwipedUp: () => {
      setSwiped(true);
    },
    onSwiping: ({ deltaY, dir }) => {
      if (dir === 'Up') {
        setPos(deltaY);
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
      if (order) {
        products = order.selectedItems.map((v) => {
          if (v.id === product.id) {
            dup = true;
            v.count = (v.count || 1) + 1;
          }
          return {
            ...v,
          };
        });
      }
      if (!dup) {
        products.push({
          ...product,
          count: 1,
        });
      }
      return {
        ...order,
        selectedItems: products,
      };
    });
  };

  const remove = (product) => {
    const index = order.selectedItems.findIndex((v) => v.id === product.id);
    order.selectedItems.splice(index, 1);
    if (!order.selectedItems.length) {
      setOrder(null);
    } else {
      setOrder({
        ...order,
      });
    }
  };

  const refPassthrough = (el) => {
    handlers.ref(el);
    orderRef.current = el;
  };

  return (
    <div className={styles.container}>
      <PageHead />
      <Header showHint={isConnectedToApi()} />   
      {order && (
        <div
          className={classNames(styles.miniCart, {
            [styles.show]: !!order,
            [styles.swiped]: swiped,
          })}
          style={{ top: pos + 'px' }}
          ref={refPassthrough}
          {...handlers}
        >
          <div className={styles.rotatedBlock}></div>
          <div className={styles.rotatedBlock2}></div>
          <Order order={order} remove={remove} />
        </div>
      )}
      <main className={styles.main}>
        {!isConnectedToApi() && <StaticMenu />}
        {isConnectedToApi() && (
          <DynamicMenu products={products} selectProduct={selectProduct} />
        )}
      </main>
      <footer className={styles.main}>
        <Link href="/about">
          <a>Про БІЛИЙ НАЛИВ</a>
        </Link>
        <Link href="https://borysov.com.ua/uk/bilyy-nalyv">
          <a>Офіційний сайт</a>
        </Link>
        <Link href="/about">
          <a>Угода</a>
        </Link>
      </footer>
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
