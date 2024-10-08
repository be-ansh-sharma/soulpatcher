import styles from './Refinements.module.scss';
import Link from 'next/link';

export default function Refinements({ list, type }) {
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>
        <Link href={`quotes/${type}`}>
          {type === 'authors' ? 'By Author' : 'By Tags'}
        </Link>
      </h2>
      <div className={styles.list}>
        {list.map((item) => {
          return (
            <div key={item.refId}>
              <Link
                className={styles.item}
                href={`/quotes/${type}/${item.name}`}
              >
                {item.friendlyName}
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
