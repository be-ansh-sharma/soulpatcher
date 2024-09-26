import './src/styles/global.scss';
import Header from 'containers/header/Header';
import styles from './layout.module.scss';
import { THEME } from 'config/styling';
import { ColorModeScript } from '@chakra-ui/react';
import { Providers } from './providers';

export const metadata = {
  title: 'My Mantine app',
  description: 'I have followed setup instructions carefully',
};

export default function Layout({ children }) {
  return (
    <html>
      <head></head>
      <body className={styles.container}>
        <Providers>
          <ColorModeScript initialColorMode={THEME.config.initialColorMode} />
          <Header />
          <main className={styles.content}>{children}</main>
          <div>footer</div>
        </Providers>
      </body>
    </html>
  );
}
