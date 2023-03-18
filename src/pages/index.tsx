import React, { useCallback } from 'react';
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

export default function Home() {
  const route = useRouter();
  const handleClick = useCallback(
    (event: React.SyntheticEvent<HTMLButtonElement>) => {
      route.push('login');
    },
    [route],
  );

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
