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
        <meta name="title" property="og:title" content="Dear My 2023" />
        <meta name="description" property="og:description" content="우리에게 선물로 다가온 시간을 채워봐요." />
        <meta name="image" property="og:image" content="/assets/images/main-symbol.png" />
        <meta name="url" property="og:url" content="https://dearmy2023.click" />
        <meta property="og:locale" content="ko_KR" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
