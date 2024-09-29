import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import styles from './Login.module.scss';
import { useState } from 'react';
import { IoMdLock } from 'react-icons/io';
import { COLOR } from 'config/styling';
import { MdOutlineAlternateEmail } from 'react-icons/md';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import useMetaStore from 'stores/meta';
import { getUserFromRemote } from 'services/Firestore';
import { Auth } from 'services/Firebase';

const Login = () => {
  const [open, setOpen] = useState(false);
  const [formField, setFormField] = useState({
    email: '',
    password: '',
  });
  const [formError, setFormError] = useState({
    email: '',
    password: '',
  });
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(Auth);
  const saveUserToStore = useMetaStore((state) => state.setUser);

  const submitHandler = async () => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const errors = {};

    if (formField.email.length === 0) {
      errors.email = 'Email is empty';
    } else if (!emailPattern.test(formField.email)) {
      errors.email = 'Email format is incorrect';
    }

    if (formField.password.length === 0) {
      errors.password = "Password can't be empty";
    } else if (formField.password.length < 8) {
      errors.password = 'Password length is too short';
    }

    // Set errors if any
    if (Object.keys(errors).length > 0) {
      setFormError(errors);
    }

    let result = await signInWithEmailAndPassword(
      formField.email,
      formField.password
    );
    if (result?.user) {
      let savedUser = await getUserFromRemote(result.user.uid);
      saveUserToStore(savedUser);
    }
  };

  const updateField = (type, value = '') => {
    let currentFormField = { ...formField };

    currentFormField[type] = value;
    setFormField(currentFormField);
  };
  return (
    <div>
      <Button
        onClick={() => setOpen(true)}
        className={styles.login}
        variant='outline'
        mr={2}
      >
        Login
      </Button>
      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Login</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form>
              <FormControl id='email' mb={4} isInvalid={formError.email}>
                <FormLabel>Email Address</FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents='none'>
                    <MdOutlineAlternateEmail color={COLOR.faded} />
                  </InputLeftElement>
                  <Input
                    type='email'
                    value={formField.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    placeholder='Your email'
                  />
                </InputGroup>
                <FormErrorMessage>{formError.email}</FormErrorMessage>
              </FormControl>

              <FormControl id='password' mb={4} isInvalid={formError.password}>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents='none'>
                    <IoMdLock color={COLOR.faded} />
                  </InputLeftElement>
                  <Input
                    type='password'
                    value={formField.password}
                    onChange={(e) => updateField('password', e.target.value)}
                    placeholder='Password'
                  />
                </InputGroup>
                <FormErrorMessage>{formError.password}</FormErrorMessage>
              </FormControl>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={submitHandler}>
              Login
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Login;
