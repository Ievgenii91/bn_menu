import styles from '../styles/Home.module.css';
import dstyles from './DynamicMenu.module.css';
import Image from 'next/image';
import classNames from 'classnames';
import ReactHtmlParser from 'react-html-parser';

export default function CategoryBlock({ config, selectProduct }) {
  const {
    imageUrl,
    imageAlt,
    imageSizes,
    category,
    imagePosition,
    categoryClassName,
    renderInProductList,
    hidePrice,
    products,
  } = config;  

  const isTopImg = () => {
    return imageUrl && (!imagePosition || imagePosition === 'top');
  };

  const isRightImg = (index) => {
    return imagePosition === 'right' && index === 0;
  };

  const canAddRender = (index) => {
    return renderInProductList && renderInProductList.pos === index;
  };

  return (
    <div className={dstyles[categoryClassName + 'Block']}>
      <h3 className={styles[categoryClassName]}>
        {category?.toLowerCase() + '.'}
      </h3>
      {isTopImg() && (
        <div className={styles.center}>
          <Image
            src={imageUrl}
            width={imageSizes[0]}
            height={imageSizes[1]}
            alt={imageAlt}
          />
        </div>
      )}

      {canAddRender(null) && renderInProductList.render()}
      
      {products.map((v, id) => {
        return (
          <div key={id + categoryClassName} className={classNames(
            styles.product,
            dstyles.product,
            dstyles.paragraph,
            {
              [dstyles.hidePrice]:
                id === hidePrice ||
                (hidePrice === 99 && id === products.length - 1),
            }
          )}>
            <div onClick={() => {
              selectProduct(products[id])
            }}>
              {ReactHtmlParser(v.fancyName)}
              <span className={dstyles.price}>
                <b>{v.price}₴</b>
              </span>
              {isRightImg(id) && (
                <div className={dstyles[categoryClassName + 'Image']}>
                  <Image
                    src={imageUrl}
                    width={imageSizes[0]}
                    height={imageSizes[1]}
                    alt={imageAlt}
                  />
                </div>
              )}
            </div>
            {canAddRender(id) && renderInProductList.render()}
          </div>
        );
      })}
    </div>
  );
}
