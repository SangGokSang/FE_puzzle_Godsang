/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import { ButtonSection } from 'src/core/styles/common';
import Button, { ButtonType } from 'src/components/button/Button';
import Layout from 'src/components/common/Layout';
import styled from '@emotion/styled';
import { InfoKeyIcon, XIcon } from 'src/core/icons';
import { KEY_INFO_KEY, useGetKeyInfo } from 'src/module/keyInfo';
import auth from 'src/recoil/auth';
import { useSyncRecoil } from 'src/core/hooks/useSyncRecoil';
import { User } from 'src/recoil/auth/type';
import { authDefaultValue } from 'src/recoil/auth/atom';
import { useRouter } from 'next/router';
import route from 'src/core/const/route.path';
import { useQueryClient } from '@tanstack/react-query';
import { usePetchKey } from 'src/module/keyInfo/hooks/usePetchKey';
import { getSession } from 'next-auth/react';

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

const CoupanWrapper = styled.div`
  width: 100%;
  height: 60px;
  position: absolute;
  bottom: 70px;

  .pusedo-wrap {
    width: 100%;
    height: 100%;
  }
`;

const CoupangAdd = styled.iframe`
  width: 100%;
  height: 100%;
`;

function KeyInfo() {
  const router = useRouter();
  const client = useQueryClient();
  const { data } = useGetKeyInfo();
  const { nickname } = useSyncRecoil<User>({ atom: auth, defaultValue: authDefaultValue });
  const [time, setTime] = useState(10);
  const { mutate } = usePetchKey({
    onSuccess: () => {
      client.invalidateQueries([KEY_INFO_KEY]);
      router.push({ pathname: route.MakeKey, query: { originId: router.query.originId } });
    },
  });

  const handleClick = () => {
    mutate();
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (time > 0) {
      interval = setInterval(() => {
        setTime((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, []);

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
        <CoupanWrapper>
          <div className="pusedo-wrap">
            <CoupangAdd
              src="https://ads-partners.coupang.com/widgets.html?id=657024&template=carousel&trackingCode=AF9396669&subId=&width=400&height=120"
              referrerPolicy="unsafe-url"
            />
          </div>
        </CoupanWrapper>
        <Button
          onClick={handleClick}
          buttonType={time > 0 ? ButtonType.Disabled : ButtonType.Basic}
          disabled={time > 0}>
          {time > 0 ? `${time}초 후에 열쇠를 획득하실 수 있습니다!` : '열쇠 획득하기'}
        </Button>
      </ButtonSection>
    </Layout>
  );
}

export async function getServerSideProps(context: any) {
  const session = await getSession(context);
  if (session === null) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  return { props: {} };
}

export default KeyInfo;
