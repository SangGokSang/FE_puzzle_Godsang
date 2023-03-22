import React from 'react';
import { css } from '@emotion/react';
import { useRouter } from 'next/router';
import Layout from 'src/components/common/Layout';

const layoutCss = css`
  .wrapper {
    width: 100%;
    height: 100%;
    padding-top: 25%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`;

function index() {
  const router = useRouter();

  return (
    <Layout layoutCss={layoutCss} useHeader={true}>
      <div> </div>
    </Layout>
  );
}

export default index;
