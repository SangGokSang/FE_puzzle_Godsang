import React from 'react';
import Layout from 'src/components/common/Layout';
import styled from '@emotion/styled';
import Image from 'next/image';
import { css } from '@emotion/css';
import GoogleAd from 'src/components/googleAd/GoogldAd';
import { BackIcon, Logo } from 'src/core/icons';
import { useRouter } from 'next/router';
import { User } from 'src/recoil/auth/type';
import route from 'src/core/const/route.path';
import { useSyncRecoil } from 'src/core/hooks/useSyncRecoil';
import auth, { authDefaultValue } from 'src/recoil/auth/atom';
import { buttonHoverCss } from 'src/core/styles/common';
import KakaoAdFit from 'src/components/kakaoAd/kakaoAdFit';

const Wrapper = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: space-between;
`;

const HowToUseWrap = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  border-radius: 15px;
`;

const backButtonCss = css`
  cursor: pointer;
  position: absolute;
  top: 5%;
  left: 5%;
`;

// 이용방법과 광고가 들어갑니다.
export default function HowToUse() {
  const { userId, isSignUp } = useSyncRecoil<User>({ atom: auth, defaultValue: authDefaultValue });

  const router = useRouter();
  const handleClickBackButton = () => router.back();
  const handleClickLoginButton = () => router.push({ pathname: route.List, query: { userId } });
  return (
    <Layout useHeader={false}>
      <Wrapper>
        <BackIcon onClick={handleClickBackButton} css={backButtonCss} />
        {isSignUp && <Logo onClick={handleClickLoginButton} css={buttonHoverCss} />}
      </Wrapper>
      <HowToUseWrap>
        <Image src="/assets/images/how-to-use.png" alt="how-to-use" width="320" height="480" />
        <KakaoAdFit />
      </HowToUseWrap>
    </Layout>
  );
}
