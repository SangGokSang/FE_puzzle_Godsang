import React from 'react';
import { css } from '@emotion/react';
import Layout from 'src/components/common/Layout';

// 페이지 완성되기 전까진 Header 사용
// 페이지 랜더링 되면 키 생성 api 호출 후 성공하면 router.back() settimeout 300
export default function MakeKey() {
  return (
    <Layout>
      <div>keypage</div>
    </Layout>
  );
}
