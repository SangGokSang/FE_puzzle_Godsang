import React from 'react';
import styled from '@emotion/styled';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 15px;
  padding-top: 130px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  & .img_wrapper {
    display: flex;
    justify-content: center;
  }

  & .button_wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
  }

  @media screen and (max-width: 768px) {
    padding-top: 60px;
  }
`;

function Main() {
  return (
    <Wrapper>
      <div className="img_wrapper">
        <img src="/assets/images/landing_puzzle_img.png" width="250" height="250" />
      </div>
      {/* <div className="button_wrapper">
        <Button>로그인</Button>
        <Button fontColor="#514e4e">이용방법</Button>
      </div> */}
    </Wrapper>
  );
}

export default Main;
