import Menu from 'containers/Menu/Menu';
import styles from './Header.module.scss';
import Account from 'components/Account/Account';
import Link from 'next/link';
import headerJson from 'config/header.json';
import Dark from 'components/dark/Dark';

const Header = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>
        <Link href='/'>{headerJson.brandNameFormatted}</Link>
      </h2>
      <Menu />
      <div className={styles.modewrapper}>
        <Dark />
        <Account />
      </div>
    </div>
  );
};

export default Header;
