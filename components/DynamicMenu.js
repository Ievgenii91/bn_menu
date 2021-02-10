import styles from '../styles/Home.module.css';
import './DynamicMenu.module.css';

import Image from 'next/image';
import CategoryBlock from './CategoryBlock';

const categories = {
  oysters: 'устриці',
  dogs: 'хот-доги',
  cider: 'Сидр',
  nalivka: 'Наливки',
  coffee: 'кава',
  cesa: 'кесадилья',
  pie: 'пиріг',
  punch: 'пунш',
  avoska: 'авоськи',
  nonalco: 'б/а'
};

export default function DynamicMenu({ products, selectProduct }) {
  const oystersConfig = {
    imageUrl: '/oyster.png',
    category: categories.oysters,
    categoryClassName: 'oysters',
    imageAlt: 'устриці білий налив',
    imageSizes: [160, 160],
    renderInProductList: {
      pos: null,
      render: () => {},
    },
    products: products.filter((v) => v.category === categories.oysters)
  };
  const dogsConfig = {
    imageUrl: '/dog.png',
    category: categories.dogs,
    categoryClassName: 'dogs',
    imageAlt: 'хот дог класичний білий налив',
    imageSizes: [100, 100],
    imagePosition: 'right',
    products: products.filter((v) => v.category === categories.dogs),
    renderInProductList: {
      pos: 3,
      render: () => {
        return (
          <>
            <div key="br2" className={styles.brioshImage}>
              <Image
                src="/briosh.png"
                width={180}
                height={180}
                alt="хот дог у бріоші білий налив"
              />
            </div>
            <p className={styles.attention}>
              Хочеш вега ? Скажи касиру і ми приготуємо
            </p>
          </>
        );
      },
    },
  };  
  const ciderConfig = {
    imageUrl: '/cider.png',
    category: categories.cider,
    categoryClassName: 'cider',
    imageAlt: 'хот дог класичний білий налив',
    imageSizes: [130, 130],
    imagePosition: 'right',
    products: products.filter((v) => v.category === categories.cider && v.fancyName),
    hidePrice: 99 // 99 if last item, in other way pass index
  };  
  const nalivkaConfig = {
    products: products.filter((v) => v.category === categories.nalivka && v.fancyName),
    imageUrl: '/nalivka.png',
    category: categories.nalivka,
    categoryClassName: 'nalivka',
    imageAlt: 'хот дог класичний білий налив',
    imageSizes: [180, 180],        
  };
  const coffeeConfig = {
    products: products.filter((v) => v.category === categories.coffee && v.fancyName),
    category: categories.coffee,
    categoryClassName: 'coffee',
    imageAlt: 'хот дог класичний білий налив',
  };  
  const cesaConfig = {
    products: products.filter((v) => v.category === categories.cesa && v.fancyName),
    imageUrl: '/cesa.png',
    imageSizes: [130, 130],
    category: categories.cesa,
    categoryClassName: 'cesa',
    imageAlt: 'кесадилья білий налив',
    imagePosition: 'right',
    renderInProductList: {
      pos: null,
      render: () => {
        return (
          <div className={styles.attention}>
            Мексиканський хот-дог у тортильї з ананасом та кукурудзою
          </div>
        );
      },
    },
  };
  const pieConfig = {
    products: products.filter((v) => v.category === categories.pie && v.fancyName),
    category: categories.pie,
    categoryClassName: 'pie',
    renderInProductList: {
      pos: null,
      render: () => {
        return (
          <div className={styles.attention}>
            По олдскулу
          </div>
        );
      },
    },
  };

  const punchConfig = {
    products: products.filter((v) => v.category === categories.punch && v.fancyName),
    category: categories.punch,
    categoryClassName: 'punch',
    renderInProductList: { pos: null, render: () => {}},
  };

  const avoskaConfig = {
    products: products.filter((v) => v.category === categories.avoska && v.fancyName),
    category: categories.avoska,
    categoryClassName: 'avoska',
    renderInProductList: { pos: null, render: () => {}},
  };
  
  const nonalcoConfig = {
    products: products.filter((v) => v.category === categories.nonalco && v.fancyName),
    category: categories.nonalco,
    categoryClassName: 'nonalco',
    renderInProductList: { pos: null, render: () => {}},
  };

  return (
    <>
      <div className={styles.side}>
        {
          [oystersConfig, dogsConfig, ciderConfig, nalivkaConfig].map((config, index) => 
          (<CategoryBlock key={index + 'a'} config={config} selectProduct={selectProduct}/>))
        }  
      </div>
      <div className={styles.side}>
        <div className={styles.divider}></div>
        {
          [coffeeConfig, cesaConfig, pieConfig].map((config, index) => 
          (<CategoryBlock key={index + 'a'} config={config} selectProduct={selectProduct}/>))
        }  
        <div className={styles.warning}>
          Більше сиру в хот-дог чи пиріг
          <b> 9₴</b>
        </div>
        {
          [punchConfig, avoskaConfig, nonalcoConfig].map((config, index) => 
          (<CategoryBlock key={index + 'a'} config={config} selectProduct={selectProduct}/>))
        } 
      </div>
    </>
  );
}
