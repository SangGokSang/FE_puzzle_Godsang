/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
  images: {
    loader: 'imgix',
    path: '',
    unoptimized: true,
  },
  redirects: async () => {
    return [
      {
        source: '/key',
        destination: '/',
        permanent: true,
      },
      {
        source: '/mypage',
        destination: '/',
        permanent: true,
      },
      {
        source: '/create',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
