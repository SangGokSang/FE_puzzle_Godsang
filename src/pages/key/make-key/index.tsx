import styled from '@emotion/styled';
import React from 'react';
import Layout from 'src/components/common/Layout';
import AdForKey from 'src/components/googleAd/AdForKey';

// 페이지 완성되기 전까진 Header 사용
// 페이지 랜더링 되면 키 생성 api 호출 후 성공하면 router.back() settimeout 300

const AdArea = styled.div`
  width: 80%;
  height: 80%;
`;

export default function MakeKey() {
  return (
    <Layout>
      <AdArea>
        <AdForKey />
      </AdArea>
    </Layout>
  );
}
