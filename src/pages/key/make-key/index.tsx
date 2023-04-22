import React from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import Layout from 'src/components/common/Layout';
import KakaoAdFit from 'src/components/kakaoAd/kakaoAdFit';
import { BackIcon } from 'src/core/icons';
import { buttonHoverCss } from 'src/core/styles/common';

// 페이지 완성되기 전까진 Header 사용
// 페이지 랜더링 되면 키 생성 api 호출 후 성공하면 router.back() settimeout 300

const AdArea = styled.div`
  width: 100%;
  height: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const backButton = css`
  position: absolute;
`;

export default function MakeKey() {
  const router = useRouter();
  const handleBackClick = () => {
    router.back();
  };
  return (
    <Layout useHeader={false}>
      <BackIcon css={[buttonHoverCss, backButton]} onClick={handleBackClick} />
      <AdArea>
        <KakaoAdFit />
      </AdArea>
    </Layout>
  );
}
