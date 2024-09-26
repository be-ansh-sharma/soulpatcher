import Menu from 'containers/Menu/Menu';
import styles from './Header.module.scss';
import Account from 'components/Account/Account';

const Header = () => {
  return (
    <div className={styles.header}>
      <div>Logo</div>
      <Menu />
      <Account />
    </div>
  );
};

export default Header;
