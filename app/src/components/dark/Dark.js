'use client';
import { FaLightbulb } from 'react-icons/fa6';
import { FaRegLightbulb } from 'react-icons/fa6';
import useMetaStore from 'stores/meta';
import styles from './Dark.module.scss';
import { useColorMode } from '@chakra-ui/react';

const Dark = () => {
  const darkMode = useMetaStore((state) => state.darkMode);
  const setDarkMode = useMetaStore((state) => state.setDarkMode);
  const { colorMode, toggleColorMode } = useColorMode();

  const changeModeHandler = () => {
    setDarkMode(!darkMode);
    toggleColorMode();
  };

  return (
    <div onClick={changeModeHandler} className={styles.container}>
      {darkMode ? <FaRegLightbulb size={20} /> : <FaLightbulb size={20} />}
    </div>
  );
};

export default Dark;
