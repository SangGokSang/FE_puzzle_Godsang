import React from 'react';
import { css } from '@emotion/react';
import { ButtonSection } from 'src/core/styles/common';
import Button from 'src/components/button';
import { ButtonType } from 'src/components/button/Button';
import { useRouter } from 'next/router';
import Layout from 'src/components/common/Layout';
import styled from '@emotion/styled';

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

const MyPageSection = styled.section`
  width: 100%;
  height: calc(100% - 60px);
  display: flex;
  align-items: center;
  justify-content: center;

  .story-line {
    width: 500px;
    height: 400px;
    font-weight: 400;
    font-size: 22px;
    line-height: 33px;
  }
`;

function index() {
  const router = useRouter();
  const handleClick = () => {
    router.back();
  };
  return (
    <Layout layoutCss={layoutCss} useHeader={true}>
      <MyPageSection>
        <div className="story-line">
          강동희님은 1994년 10월 25일 생이고,
          <br />
          2023년 1월, 한국 나이 30살이 되었어요.
          <br />
          <br />
          하지만 2023년 6월 부터,
          <br />
          강동희님은 만 29살로 살게됩니다.
          <br />
          <br />
          그리고 다시 30살까지,
          <br />
          576일이라는 시간이 남았습니다.
          <br />
          <br />
          선물처럼 주어진 이 시간동안 우리는,
          <br />
          밥 공기 1500그릇 | 쇠질 526시간 | 독서 75권 을
          <br /> 할 수 있어요.
        </div>
      </MyPageSection>
      <ButtonSection>
        <Button buttonType={ButtonType.Basic} onClick={handleClick}>
          돌아가기
        </Button>
      </ButtonSection>
    </Layout>
  );
}

export default index;
