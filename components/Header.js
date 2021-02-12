import styles from './Header.module.css';
import Image from 'next/image';

export default function Header({ showHint }) {
    return (
        <header>
        {showHint && (
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
      </header> 
    )
}