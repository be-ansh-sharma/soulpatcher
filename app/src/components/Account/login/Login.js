'use client';
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import styles from './Login.module.scss';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { useState } from 'react';
import { Input } from '@chakra-ui/react';
import { MdOutlineAlternateEmail } from 'react-icons/md';
import { IoMdLock } from 'react-icons/io';
import { COLOR } from 'config/styling';

const Login = () => {
  const [open, setOpen] = useState(false);
  const [formField, setFormField] = useState({
    first: '',
    last: '',
    email: '',
    password: '',
    passwordconfirm: '',
  });
  const [formError, setFormError] = useState({
    first: '',
    last: '',
    email: '',
    password: '',
    passwordconfirm: '',
  });

  const updateField = (type, value) => {
    let currentFormField = { ...formField };
    currentFormField[type] = value || '';

    setFormField(currentFormField);
  };

  const submitHandler = () => {
    if ()
  };

  return (
    <div className={styles.container}>
      <Button
        onClick={() => setOpen(true)}
        className={styles.login}
        variant='outline'
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
              <div className={styles.nameWrapper}>
                <FormControl id='first-name' mb={4} isInvalid={formError.first}>
                  <FormLabel>First Name</FormLabel>
                  <Input
                    type='text'
                    value={formField.first}
                    onChange={(e) => updateField('first', e.target.value)}
                    placeholder='First Name'
                  />
                  <FormErrorMessage>{formError.first}</FormErrorMessage>
                </FormControl>

                <FormControl id='last-name' mb={4} isInvalid={formError.last}>
                  <FormLabel>Last Name</FormLabel>
                  <Input
                    type='text'
                    value={formField.last}
                    onChange={(e) => updateField('last', e.target.value)}
                    placeholder='Last Name'
                  />
                  <FormErrorMessage>{formError.last}</FormErrorMessage>
                </FormControl>
              </div>

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

              <FormControl
                id='passwordconfirm'
                mb={4}
                isInvalid={formError.passwordconfirm}
              >
                <FormLabel>Confirm Password</FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents='none'>
                    <IoMdLock color={COLOR.faded} />
                  </InputLeftElement>
                  <Input
                    type='password'
                    value={formField.passwordconfirm}
                    onChange={(e) =>
                      updateField('passwordconfirm', e.target.value)
                    }
                    placeholder='Confirm Password'
                  />
                </InputGroup>
                <FormErrorMessage>{formError.passwordconfirm}</FormErrorMessage>
              </FormControl>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={submitHandler}>
              Register
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Login;
