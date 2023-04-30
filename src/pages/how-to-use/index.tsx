import React from 'react';
import Layout from 'src/components/common/Layout';
import styled from '@emotion/styled';
import Image from 'next/image';
import { css } from '@emotion/react';
import { BackIcon } from 'src/core/icons';
import { useRouter } from 'next/router';
import { User } from 'src/recoil/auth/type';
import route from 'src/core/const/route.path';
import { useSyncRecoil } from 'src/core/hooks/useSyncRecoil';
import auth, { authDefaultValue } from 'src/recoil/auth/atom';
import KakaoAdFit from 'src/components/kakaoAd/kakaoAdFit';
import { useRecoilValue } from 'recoil';
import isMobile from 'src/recoil/isMobile';

const HowToUseWrap = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border-radius: 15px;
`;

const backButtonCss = css`
  cursor: pointer;
  position: absolute;
`;

const CreatePuzzle = styled.button`
  position: absolute;
  right: 0;
  background-color: #f4f4f4;
  color: rgb(114, 114, 114);
  height: 40px;
  width: 100px;
  border-radius: 30px;
  font-size: 14px;
`;

const ContactUs = styled.div<{ isMobileView: boolean }>`
  width: ${(props) => (props.isMobileView ? '330px' : '620px')};
  height: 60px;
  margin: 10px 0;
  border-radius: 15px;
  font-size: 12px;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 5px;
  border: 1px dashed gray;
`;

// 이용방법과 광고가 들어갑니다.
export default function HowToUse() {
  const { isSignUp } = useSyncRecoil<User>({ atom: auth, defaultValue: authDefaultValue });
  const isMobileView = useRecoilValue(isMobile);
  const router = useRouter();
  const handleClickBackButton = () => router.back();
  return (
    <Layout useHeader={false}>
      {(!isSignUp || !!router.query.fromMyPage) && <BackIcon onClick={handleClickBackButton} css={backButtonCss} />}
      {isSignUp && <CreatePuzzle onClick={() => router.push(route.Create)}>퍼즐 만들기</CreatePuzzle>}
      <HowToUseWrap>
        <Image
          src="/assets/images/how-to-use.png"
          alt="how-to-use"
          width={isMobileView ? '330' : '620'}
          height={isMobileView ? '520' : '720'}
        />
        <ContactUs isMobileView={isMobileView}>
          <h5>이용 중 개선사항/문의는 아래 메일에 남겨주세요.</h5>
          <p>kangactor1994@gmail.com</p>
        </ContactUs>
        <KakaoAdFit />
      </HowToUseWrap>
    </Layout>
  );
}
