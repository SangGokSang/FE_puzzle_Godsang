import React from 'react';
import Button, { ButtonType } from 'src/components/button/Button';
import Layout from 'src/components/common/Layout';
import { ButtonSection } from 'src/common/styles/common';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

const login_icon = ['kakao', 'naver', 'google'];

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

// main color 테마로 지정하기
const TitleSection = styled.div`
  text-align: center;
  h3 {
    margin: 0;
    margin-bottom: 6px;
    line-height: 34px;
    font-size: 32px;
    color: #9148da;
    /* font-family: 'establish Retrosans'; */
    letter-spacing: -0.002em;
  }
  p {
    font-size: 16px;
    line-height: 25px;
  }
`;

const IconSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: #727272;
  p {
    font-size: 13px;
    line-height: 20px;
  }
  .icon-wrapper {
    display: flex;
    gap: 15px;
    margin-top: 18px;
  }
`;

function Login() {
  const handleClickHowToUse = () => {};
  //서버로 리디렉션 보내야함
  const handleClickIcon = (icon: string) => () => {
    console.log(icon);
  };
  return (
    <Layout layoutCss={layoutCss} useHeader={false}>
      <div className="wrapper">
        <TitleSection>
          <h3>디어,마이 2023</h3>
          <p>나의 퍼즐을 맞춰주세요.</p>
        </TitleSection>
        <IconSection>
          <p>소셜 계정으로 간편하게 로그인하기</p>
          <div className="icon-wrapper">
            {login_icon.map((icon) => (
              <img
                key={icon}
                src={`/assets/icons/login/${icon}.png`}
                alt="소셜 로그인 아이콘 버튼입니다."
                onClick={handleClickIcon(icon)}
              />
            ))}
          </div>
        </IconSection>
        <ButtonSection>
          <Button buttonType={ButtonType.Text} onClick={handleClickHowToUse}>
            이용방법
          </Button>
        </ButtonSection>
      </div>
    </Layout>
  );
}

export default Login;
