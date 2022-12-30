import React from 'react';
import { Global } from '@emotion/react';
import type { AppProps } from 'next/app';
import { globalStyle } from 'src/common/styles/global';
import Layout from 'src/components/common/Layout';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

/**
 * 각각의 페이지가 초기화 될 때 로딩이 되는 파일
 * 초기화 로직을 컨트롤 할 수 있음
 */

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <Global styles={globalStyle} />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </RecoilRoot>
    </QueryClientProvider>
  );
}
