import React from 'react';
import { css } from '@emotion/react';
import { ButtonSection } from 'src/core/styles/common';
import Button from 'src/components/button';
import { ButtonType } from 'src/components/button/Button';
import { useRouter } from 'next/router';
import Layout from 'src/components/common/Layout';
import styled from '@emotion/styled';

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

const MyPageSection = styled.section`
  width: 100%;
  height: calc(100% - 60px);
`;

function index() {
  const router = useRouter();
  const handleClick = () => {
    router.back();
  };
  return (
    <Layout layoutCss={layoutCss} useHeader={true}>
      <MyPageSection></MyPageSection>
      <ButtonSection>
        <Button buttonType={ButtonType.Basic} onClick={handleClick}>
          돌아가기
        </Button>
      </ButtonSection>
    </Layout>
  );
}

export default index;
