import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link href="https://webfontworld.github.io/ssro/EstablishRetrosans.css" rel="stylesheet" />
        <link href="https://webfontworld.github.io/gmarket/GmarketSans.css" rel="stylesheet" />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8879317803203947"
          crossOrigin="anonymous"></Script>
        <meta name="description" content="Dear My 2023, 우리에게 선물로 다가온 시간을 채워봐요." />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
