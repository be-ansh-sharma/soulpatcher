import Link from 'next/link';
import styles from './similar.module.scss';

export default function Similar({ author }) {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        Get More Quotes from{' '}
        <Link className={styles.link} href={`/quotes/authors/${author}`}>
          {author}
        </Link>
      </h2>
    </div>
  );
}
