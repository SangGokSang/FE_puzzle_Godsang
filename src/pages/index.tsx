import React, { useCallback } from 'react';
import { css } from '@emotion/react';
import Main from './main';
import Layout from 'src/components/common/Layout';
import styled from '@emotion/styled';
import Button from 'src/components/button';
import { ButtonType } from 'src/components/button/Button';

const layoutCss = css`
  display: flex;
  flex-direction: column;
`;

const ImageSection = styled.section`
  width: 100%;
  height: calc(100% - 60px);
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

const ButtonSection = styled.section`
  width: 100%;
  height: 60px;
`;

export default function Home() {
  const handleClick = useCallback((event: React.SyntheticEvent<HTMLButtonElement>) => {}, []);
  return (
    <Layout useHeader={false} layoutCss={layoutCss}>
      <ImageSection>
        <div className="img" />
      </ImageSection>
      <ButtonSection>
        <Button buttonType={ButtonType.Text} onClick={handleClick}>
          이용방법
        </Button>
      </ButtonSection>
    </Layout>
  );
}
