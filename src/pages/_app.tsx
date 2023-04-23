import React, { useState } from 'react';
import { Global } from '@emotion/react';
import type { AppProps } from 'next/app';
import { globalStyle } from 'src/core/styles/global';
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RecoilRoot } from 'recoil';
import { createTheme, ThemeProvider } from '@mui/material';
import { SessionProvider } from 'next-auth/react';
import { SnackbarProvider } from 'notistack';
import 'dayjs/locale/ko';
import dayjs from 'dayjs';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
dayjs.locale('ko');

const theme = createTheme({
  components: {
    MuiInputBase: {
      styleOverrides: {
        input: {
          textAlign: 'left',
        },
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
          fontFamily: 'GmarketSans',
          fontSize: '13px',
          lineHeight: '20px',
        },
      },
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: false,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <SessionProvider session={pageProps.session}>
          <RecoilRoot>
            <ThemeProvider theme={theme}>
              <Global styles={globalStyle} />
              <SnackbarProvider autoHideDuration={4000} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                {/* <ReactQueryDevtools /> */}
                <Component {...pageProps} />
              </SnackbarProvider>
            </ThemeProvider>
          </RecoilRoot>
        </SessionProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}
