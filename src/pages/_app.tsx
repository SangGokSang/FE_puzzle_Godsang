import React, { useState } from 'react';
import { Global } from '@emotion/react';
import type { AppProps } from 'next/app';
import { globalStyle } from 'src/common/styles/global';
import Layout from 'src/components/common/Layout';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RecoilRoot } from 'recoil';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { createTheme, ThemeProvider } from '@mui/material';

/**
 * 각각의 페이지가 초기화 될 때 로딩이 되는 파일
 * 초기화 로직을 컨트롤 할 수 있음
 */

/**
 * Query Client 를 state 에 담아두는 이유 (전역이 아닌)
 * App 에 위차한 state 에 담아둠으로써 App 의 라이프 사이클에서 단 한번만 생성이 되고,
 * 다른 요청과 다른 유저들과 데이터가 공유되지 않는걸 보증해줌
 */

const theme = createTheme({
  components: {
    MuiInputBase: {
      styleOverrides: {
        root: {},
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          border: 'none',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          width: '100%',
          height: '60px',
          background: '#f3f3f3',
          borderRadius: '6px',
        },
      },
    },
  },
});
export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <ThemeProvider theme={theme}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Global styles={globalStyle} />
            <Component {...pageProps} />
          </LocalizationProvider>
        </ThemeProvider>
      </RecoilRoot>
    </QueryClientProvider>
  );
}
