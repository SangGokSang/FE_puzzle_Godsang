import { Html, Head, Main, NextScript } from 'next/document';

/**
 * HTML 페이지 중 Document 부분에 대한 오버라이딩 제공
 */
export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link href="https://webfontworld.github.io/ssro/EstablishRetrosans.css" rel="stylesheet" />
        <link href="https://webfontworld.github.io/gmarket/GmarketSans.css" rel="stylesheet" />
        <meta name="description" content="Dear My 2023, 우리에게 선물로 다가온 시간을 채워봐요." />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
