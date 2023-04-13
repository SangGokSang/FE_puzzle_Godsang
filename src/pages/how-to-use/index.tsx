import React from 'react';
import Layout from 'src/components/common/Layout';
import styled from '@emotion/styled';
import Image from 'next/image';
import symbol_img from 'public/assets/images/main-symbol.png';
import { css } from '@emotion/css';

const HowToUseWrap = styled.div`
  width: 340px;
  height: 560px;
  background-color: #fff;
  border-radius: 15px;
`;

// 이용방법과 광고가 들어갑니다.
export default function HowToUse() {
  return (
    <Layout>
      <HowToUseWrap>
        <Image src="/assets/images/how-to-use.png" alt="how-to-use" width="340" height="0" />
      </HowToUseWrap>
    </Layout>
  );
}
