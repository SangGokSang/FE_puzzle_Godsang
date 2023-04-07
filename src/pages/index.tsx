import React, { useEffect } from 'react';
import Button, { ButtonType } from 'src/components/button/Button';
import Layout from 'src/components/common/Layout';
import { ButtonSection } from 'src/core/styles/common';
import styled from '@emotion/styled';
import { FacebookIcon, GoogleIcon, KakaoIcon, NaverIcon } from 'src/core/icons';
import useLogin from 'src/core/hooks/useLogin';
import { Provider } from 'src/core/type/provider';
import Image from 'next/image';
import symbol_img from 'public/assets/images/main-symbol.png';
import { useRecoilValue } from 'recoil';
import isMobile from 'src/recoil/isMobile';
import { useSnackbar } from 'notistack';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 15%;
  display: flex;
  flex-direction: column;
  gap: 12%;

  @media screen and (min-width: 768px) {
    width: 768px;
    padding-top: 25%;
    gap: 15%;
  }
`;

// main color 테마로 지정하기
const TitleSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  h3 {
    margin: 0;
    margin-top: 10px;
    line-height: 34px;
    font-size: 32px;
    color: #9148da;
    font-family: 'EstablishRetrosans';
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
  svg {
    cursor: pointer;
  }
`;

export default function Home() {
  const login = useLogin();
  const isMobileView = useRecoilValue(isMobile);
  const { enqueueSnackbar } = useSnackbar();
  const handleClickHowToUse = () => {
    // 처리필요
  };

  const handleClickIcon = (provider: Provider) => () => {
    login(provider);
  };

  useEffect(() => {
    if (!isMobileView) {
      enqueueSnackbar('모바일 화면에 최적화 되어있습니다.');
    }
  }, [isMobileView]);

  return (
    <Layout useHeader={false}>
      <Wrapper>
        <TitleSection>
          <Image alt="img" src={symbol_img} width="70" height="70" />
          <h3>디어,마이 2023</h3>
          <p>나의 퍼즐을 맞춰주세요.</p>
        </TitleSection>
        <IconSection>
          <p>소셜 계정으로 간편하게 로그인하기</p>
          <div className="icon-wrapper">
            <GoogleIcon onClick={handleClickIcon('google')} />
            <NaverIcon onClick={handleClickIcon('naver')} />
            <KakaoIcon onClick={handleClickIcon('kakao')} />
            <FacebookIcon onClick={handleClickIcon('facebook')} />
          </div>
        </IconSection>
        <ButtonSection>
          <Button buttonType={ButtonType.Text} onClick={handleClickHowToUse}>
            이용방법
          </Button>
        </ButtonSection>
      </Wrapper>
    </Layout>
  );
}
