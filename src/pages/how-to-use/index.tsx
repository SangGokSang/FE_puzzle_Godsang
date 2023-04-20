import React from 'react';
import Layout from 'src/components/common/Layout';
import styled from '@emotion/styled';
import Image from 'next/image';
import { css } from '@emotion/css';
import GoogleAd from 'src/components/googleAd/GoogldAd';
import { BackIcon } from 'src/core/icons';
import { useRouter } from 'next/router';

const HowToUseWrap = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  border-radius: 15px;

  .ad-area {
    width: 100%;
    height: 60px;
  }
`;

const backButtonCss = css`
  cursor: pointer;
  position: absolute;
  top: 5%;
  left: 5%;
`;

// 이용방법과 광고가 들어갑니다.
export default function HowToUse() {
  const router = useRouter();
  const handleClickBackButton = () => router.back();
  return (
    <Layout useHeader={false}>
      <BackIcon onClick={handleClickBackButton} css={backButtonCss} />
      <HowToUseWrap>
        <Image src="/assets/images/how-to-use.png" alt="how-to-use" width="320" height="480" />
        <div className="ad-area">
          <GoogleAd />
        </div>
      </HowToUseWrap>
    </Layout>
  );
}
