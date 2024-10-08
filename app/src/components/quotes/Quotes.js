import Link from 'next/link';
import styles from './Quotes.module.scss';

export default function Quotes({ type, list, id }) {
  let author = list[0].friendlyName;
  let tag = type === 'tag' ? id : null;
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>
        Quotes by {type === 'author' ? author : tag}
      </h1>
      <div className={styles.list}>
        {list.map((quote) => {
          return (
            <Link
              href={`/quotes/${quote.refId}`}
              className={styles.item}
              key={quote.refId}
            >
              {quote.message}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
