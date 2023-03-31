import React from 'react';
import { Backdrop, CircularProgress } from '@mui/material';
import { css } from '@emotion/react';

type LoadingProps = {
  isLoading: boolean;
};

function Loading({ isLoading }: LoadingProps) {
  return isLoading ? (
    <Backdrop open>
      <CircularProgress />
    </Backdrop>
  ) : (
    <></>
  );
}

export default Loading;
