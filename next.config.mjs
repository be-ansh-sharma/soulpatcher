/** @type {import('next').NextConfig} */
import nextPWA from 'next-pwa';
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  sassOptions: {
    additionalData: `@import "app/src/styles/mixins.scss";`,
  },
};

const withPWA = nextPWA({
  dest: 'public',
});

export default withPWA(nextConfig);

