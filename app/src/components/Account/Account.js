'use client';
import { useEffect } from 'react';
import styles from './Account.module.scss';
import Login from './login/Login';
import Register from './register/Register';
import { useAuthState } from 'react-firebase-hooks/auth';

const Account = () => {
  const [user, loading, error] = useAuthState(auth, options);

  return (
    <div className={styles.container}>
      {!!user ? (
        <div>hello</div>
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
