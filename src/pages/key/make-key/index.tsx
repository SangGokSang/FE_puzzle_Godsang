import React from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import Layout from 'src/components/common/Layout';
import KakaoAdFit from 'src/components/kakaoAd/kakaoAdFit';
import { BackIcon } from 'src/core/icons';
import { buttonHoverCss } from 'src/core/styles/common';

const AdArea = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 30px;
  justify-content: center;
  align-items: center;
`;

const backButton = css`
  position: absolute;
`;

const description = css`
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: center;
  justify-content: center;
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
        <div css={description}>
          <p>키 생성이 완료되었습니다!</p>
          <p>뒤로가기 버튼을 클릭해주세요!</p>
        </div>
        <KakaoAdFit />
      </AdArea>
    </Layout>
  );
}
