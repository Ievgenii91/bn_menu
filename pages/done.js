import PageHead from '../components/PageHead';
import styles from '../styles/Home.module.css';

export default function Done() {
  return (
    <>
      <PageHead />
      <main className={styles.main}>
        Замовлення успішно оплачене, чекайте повідомлення про виконання!
      </main>
      <footer></footer>
    </>
  );
}
