import React, { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import { ButtonSection } from 'src/core/styles/common';
import Button from 'src/components/button';
import { ButtonType } from 'src/components/button/Button';
import Layout from 'src/components/common/Layout';
import styled from '@emotion/styled';
import { InfoKeyIcon, XIcon } from 'src/core/icons';
import { useGetKeyInfo } from 'src/module/keyInfo';
import auth from 'src/recoil/auth';
import { useSyncRecoil } from 'src/core/hooks/useSyncRecoil';
import { User } from 'src/recoil/auth/type';
import { authDefaultValue } from 'src/recoil/auth/atom';
import { useRouter } from 'next/router';
import route from 'src/core/const/route.path';
import GoogleAd from 'src/components/googleAd/GoogldAd';
import { useMovePage } from 'src/core/util/util';

export type KeyInfo = {
  keyCount: number;
};

const layoutCss = css`
  background: #f9f9f9;
  .Wrapper {
    width: 100%;
    height: 100%;
    padding-top: 25%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`;

const KeyInfoSection = styled.section`
  width: 100%;
  height: calc(100% - 60px);
  display: flex;
  flex: 1 1;
`;

const InfoWrap = styled.div`
  display: flex;
  margin: auto;
  gap: 30px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const InfoTitle = styled.div`
  font-weight: 400;
  font-size: 24px;
  line-height: 34px;
`;

const InfoBox = styled.div`
  width: 260px;
  height: 164px;
  background: #ffffff;
  border-radius: 22px;
`;

const InfoContent = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 31px 60px;
`;

const KeyCount = styled.span`
  font-weight: 400;
  font-size: 30px;
  line-height: 40px;
`;

const Attention = styled.div`
  padding-left: 34px;
  font-weight: 400;
  font-size: 13px;
  line-height: 20px;
  color: #9148da;
`;

function KeyInfo() {
  const disabledTime = 30000;
  const router = useRouter();
  const { data } = useGetKeyInfo();
  const { nickname } = useSyncRecoil<User>({ atom: auth, defaultValue: authDefaultValue });
  const [isClicked, setIsClicked] = useState<boolean>(localStorage.getItem('isButtonClicked') === 'true' || false);
  const [remainingTime, setRemainingTime] = useState<number>(
    localStorage.getItem('remainingTime') ? Number(localStorage.getItem('remainingTime')) : disabledTime,
  );

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (isClicked) {
      intervalId = setInterval(() => {
        setRemainingTime((time) => time - 1000);
        localStorage.setItem('remainingTime', (remainingTime - 1000).toString());
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [isClicked, remainingTime]);

  useEffect(() => {
    if (remainingTime <= 0) {
      setIsClicked(false);
      setRemainingTime(disabledTime);
      localStorage.removeItem('isButtonClicked');
      localStorage.removeItem('remainingTime');
    }
  }, [remainingTime]);

  const moveToMakeKey = useMovePage(router, route.MakeKey, {
    originId:
      router.pathname === route.Key || router.pathname === route.MyPage ? router.query.originId : router.query.userId,
  });

  const handleClick = () => {
    setIsClicked(true);
    localStorage.setItem('isButtonClicked', 'true');
    moveToMakeKey();
  };

  return (
    <Layout layoutCss={layoutCss}>
      <KeyInfoSection>
        <InfoWrap>
          <InfoTitle>{nickname}님의 열쇠 갯수</InfoTitle>
          <InfoBox>
            <InfoContent>
              <InfoKeyIcon />
              <XIcon />
              <KeyCount>{data?.keyCount}</KeyCount>
            </InfoContent>
            <Attention>DM 확인에 필요한 열쇠 갯수: 1개</Attention>
          </InfoBox>
        </InfoWrap>
      </KeyInfoSection>
      <ButtonSection>
        <Button
          buttonType={ButtonType.Basic}
          onClick={handleClick}
          disabled={isClicked}
          isClicked={isClicked}
          disabledTime={disabledTime}
          remainingTime={remainingTime}>
          열쇠 획득하기
        </Button>
      </ButtonSection>
      <GoogleAd />
    </Layout>
  );
}

export default KeyInfo;
