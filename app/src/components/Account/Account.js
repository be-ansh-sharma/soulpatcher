'use client';
import styles from './Account.module.scss';
import Login from './login/Login';
import Register from './register/Register';
import { useAuthState, useSignOut } from 'react-firebase-hooks/auth';
import { Auth } from 'services/Firebase';
import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import useMetaStore from 'stores/meta';
import Link from 'next/link';

const Account = () => {
  const [user, loading, error] = useAuthState(Auth);
  const [signOut, singoutLoading, singoutError] = useSignOut(Auth);
  const savedUser = useMetaStore((state) => state.user);
  const setUser = useMetaStore((state) => state.setUser);

  const signoutHandler = async () => {
    await signOut();
    setUser({});
  };

  return (
    <div className={styles.container}>
      {!!Object.keys(savedUser).length ? (
        <Menu>
          <MenuButton
            className={styles.menu}
            as={Button}
            rightIcon={<MdOutlineKeyboardArrowDown />}
          >
            Hello, {savedUser.firstName || 'Chosen One!'}
          </MenuButton>
          <MenuList>
            <MenuItem>
              <Link href='/dashboard'>Dashboard</Link>
            </MenuItem>
            <MenuItem onClick={signoutHandler}>Sign Out</MenuItem>
          </MenuList>
        </Menu>
      ) : (
        <>
          <Login />
          <Register />
        </>
      )}
    </div>
  );
};

export default Account;
