import Menu from 'containers/Menu/Menu';
import styles from './Header.module.scss';
import Account from 'components/Account/Account';
import Link from 'next/link';
import headerJson from 'config/header.json';

const Header = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>
        <Link legacyBehavior href='/'>
          <a
            dangerouslySetInnerHTML={{
              __html: headerJson.brandNameFormatted,
            }}
          ></a>
        </Link>
      </h2>
      <Menu />
      <Account />
    </div>
  );
};

export default Header;
