'use client';
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import styles from './Register.module.scss';
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
import { Auth } from 'services/Firebase';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { saveUserToRemote } from 'services/Firestore';
import useMetaStore from 'stores/meta';

const Register = () => {
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
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(Auth);

  const saveUserToStore = useMetaStore((state) => state.setUser);

  const updateField = (type, value = '') => {
    let currentFormField = { ...formField };
    const namePattern = /^[a-zA-Z\s'-]+$/;

    if (
      (type === 'first' || type === 'last') &&
      value.length &&
      !namePattern.test(value)
    ) {
      setFormField(currentFormField);
      return;
    }
    currentFormField[type] = value;
    setFormField(currentFormField);
  };

  const submitHandler = async () => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const errors = {};

    // Validation checks
    if (formField.first.length === 0) {
      errors.first = 'First Name is empty';
    } else if (formField.first.length < 2) {
      errors.first = 'First Name must be at least 2 characters long';
    }

    if (formField.last.length === 0) {
      errors.last = 'Last Name is empty';
    } else if (formField.last.length < 2) {
      errors.last = 'Last Name must be at least 2 characters long';
    }

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

    if (formField.passwordconfirm.length === 0) {
      errors.passwordconfirm = "Password confirmation can't be empty";
    } else if (formField.passwordconfirm.length < 8) {
      errors.passwordconfirm = 'Password length is too short';
    } else if (formField.password !== formField.passwordconfirm) {
      errors.passwordconfirm = 'Passwords do not match';
    }

    // Set errors if any
    if (Object.keys(errors).length > 0) {
      setFormError(errors);
    }

    try {
      let result = await createUserWithEmailAndPassword(
        formField.email,
        formField.password
      );
      let user = result?.user;

      if (!user) {
        console.log('something is wrong');
        return;
      }

      let newUser = {
        email: user.email,
        userId: user.uid,
        firstName: formField.first,
        lastName: formField.last,
      };
      await saveUserToRemote(newUser);

      saveUserToStore(newUser);
      console.log('compelted');
    } catch (err) {
      console.log(err);
      if (err.code === 400) {
        setFormError({
          email: 'Email is already in use. Please use another email.',
        });
      } else {
        console.log('Error creating user:', error.message);
      }
    }
  };

  return (
    <div className={styles.container}>
      <Button
        className={styles.register}
        onClick={() => setOpen(true)}
        variant='outline'
      >
        Register
      </Button>
      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Register</ModalHeader>
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

export default Register;
