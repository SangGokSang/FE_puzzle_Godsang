import React from 'react';
import Button, { ButtonType } from 'src/components/button/Button';
import Layout from 'src/components/common/Layout';
import { ButtonSection } from 'src/common/styles/common';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

const layoutCss = css`
  .wrapper {
    width: 100%;
    height: 100%;
    padding-top: 126px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`;

// main color 테마로 지정하기
const TitleSection = styled.div`
  text-align: center;
  h3 {
    margin: 0;
    line-height: 34px;
    font-size: 32px;
    color: #9148da;
    font-family: 'establish Retrosans';
    letter-spacing: -0.002em;
  }
  p {
    font-size: 16px;
    line-height: 25px;
  }
`;

const IconSection = styled.div`
  p {
    font-size: 13px;
    line-height: 20px;
  }
`;

function Login() {
  const handleClick = () => {};
  return (
    <Layout layoutCss={layoutCss} useHeader={false}>
      <div className="wrapper">
        <TitleSection>
          <h3>디어,마이 2023</h3>
          <p>나의 퍼즐을 맞춰주세요.</p>
        </TitleSection>
        <IconSection>
          <p>소셜 계정으로 간편하게 로그인하기</p>
        </IconSection>
        <ButtonSection>
          <Button buttonType={ButtonType.Text} onClick={handleClick}>
            이용방법
          </Button>
        </ButtonSection>
      </div>
    </Layout>
  );
}

export default Login;
