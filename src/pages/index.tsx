import React from 'react';
import { css } from '@emotion/react';
import Layout from 'src/components/common/Layout';
import styled from '@emotion/styled';
import Button from 'src/components/button';
import { ButtonType } from 'src/components/button/Button';
import { ButtonSection } from 'src/core/styles/common';
import { useRouter } from 'next/router';

const layoutCss = css`
  display: flex;
  flex-direction: column;
`;

const ImageSection = styled.section`
  width: 100%;
  height: calc(100% - 140px);
  display: flex;
  align-items: center;
  justify-content: center;

  & .img {
    width: 300px;
    height: 300px;
    border-radius: 100px;
    background-color: #000;
  }
`;

export default function Home() {
  const route = useRouter();
  const handleLoginClick = () => {
    route.push('login');
  };

  const handleUseWayClick = () => {
    // 이용방법 페이지 없으면 외부 라우팅
  };

  return (
    <Layout useHeader={false} layoutCss={layoutCss}>
      <ImageSection>
        <div className="img" />
      </ImageSection>
      <ButtonSection
        css={css`
          height: 120px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        `}>
        <Button buttonType={ButtonType.Basic} onClick={handleLoginClick}>
          로그인
        </Button>
        <Button buttonType={ButtonType.Text} onClick={handleUseWayClick}>
          이용방법
        </Button>
      </ButtonSection>
    </Layout>
  );
}
