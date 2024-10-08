import Link from 'next/link';
import styles from './Body.module.scss';

export default function Body({ quote }) {
  return (
    <div className={styles.container}>
      <div className={styles.message}>{quote.message}</div>
      <div className={styles.tags}>
        {quote.tags.map((tag) => {
          return (
            <Link href={`/quotes/tags/${tag}`} className={styles.tag} key={tag}>
              {tag}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
