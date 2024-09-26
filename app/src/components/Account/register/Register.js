import { Button } from '@chakra-ui/react';
import styles from '../Account.module.scss';

const Register = () => {
  return (
    <div>
      <Button className={styles.register} variant='default'>
        Register
      </Button>
    </div>
  );
};

export default Register;
