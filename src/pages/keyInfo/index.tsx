import React from 'react';
import { css } from '@emotion/react';
import { ButtonSection } from 'src/core/styles/common';
import Button from 'src/components/button';
import { ButtonType } from 'src/components/button/Button';
import Layout from 'src/components/common/Layout';
import styled from '@emotion/styled';

export type KeyInfo = {
  keyCount: number;
};

const layoutCss = css`
  .wrapper {
    width: 100%;
    height: 100%;
    background-color: #f5f5f5;
    padding-top: 25%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`;

const MyPageSection = styled.section`
  width: 100%;
  height: calc(100% - 60px);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function KeyInfo() {
  const handleClick = () => {
    console.log('click');
  };

  return (
    <Layout layoutCss={layoutCss} useHeader={true}>
      <MyPageSection></MyPageSection>
      <ButtonSection>
        <Button buttonType={ButtonType.Basic} onClick={handleClick}>
          열쇠 만들기
        </Button>
      </ButtonSection>
    </Layout>
  );
}

export default KeyInfo;
