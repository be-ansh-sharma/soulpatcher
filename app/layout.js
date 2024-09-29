// app/layout.js
import './src/styles/global.scss';
import Header from 'containers/header/Header';
import styles from './layout.module.scss';
import { THEME } from 'config/styling';
import { ColorModeScript } from '@chakra-ui/react';
import { Providers } from './providers';
import Footer from 'components/footer/Footer';

export const metadata = {
  title: 'My Mantine app',
  description: 'I have followed setup instructions carefully',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={styles.container}>
        <ColorModeScript initialColorMode={THEME.config.initialColorMode} />
        <Providers>
          <Header />
          <main className={styles.content}>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
