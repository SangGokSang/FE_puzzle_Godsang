import { Html, Head, Main, NextScript } from 'next/document';

/**
 * HTML 페이지 중 Document 부분에 대한 오버라이딩 제공
 */
export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
