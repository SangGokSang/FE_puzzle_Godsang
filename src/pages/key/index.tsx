import React from 'react';
import { css } from '@emotion/react';
import { ButtonSection } from 'src/core/styles/common';
import Button from 'src/components/button';
import { ButtonType } from 'src/components/button/Button';
import Layout from 'src/components/common/Layout';
import styled from '@emotion/styled';
import { InfoKeyIcon, XIcon } from 'src/core/icons';

export type KeyInfo = {
  keyCount: number;
};

const layoutCss = css`
  .wrapper {
    width: 100%;
    height: 100%;
    background: #f9f9f9;
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
  gap: 22px;
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
  const handleClick = () => {
    console.log('click');
  };

  return (
    <Layout layoutCss={layoutCss} useHeader={true}>
      <KeyInfoSection>
        <InfoWrap>
          <InfoTitle>별명님의 열쇠 갯수</InfoTitle>
          <InfoBox>
            <InfoContent>
              <InfoKeyIcon />
              <XIcon />
              <KeyCount>0</KeyCount>
            </InfoContent>
            <Attention>DM 확인에 필요한 열쇠 갯수: 1개</Attention>
          </InfoBox>
        </InfoWrap>
      </KeyInfoSection>
      <ButtonSection>
        <Button buttonType={ButtonType.Basic} onClick={handleClick}>
          열쇠 만들기
        </Button>
      </ButtonSection>
    </Layout>
  );
}

export default KeyInfo;
