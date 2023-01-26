import React from 'react';
import styled from '@emotion/styled';

const Wrapper = styled.div`
  width: 100%;
  padding: 15px;
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
`;

const Button = styled.button<{ fontColor?: string }>`
  width: 220px;
  height: 40px;
  border-radius: 15px;
  background-color: #fff;
  color: ${(props) => props.fontColor || '#000'};
  font-size: 14px;
  font-weight: 600;
  border: 1.5px dashed rgb(175, 32, 16);
  box-shadow: white 0px 0px 0px 4px, rgb(175 32 16) 0px 0px 0px 2px, grey 1px 6px 10px;
`;

function Main() {
  return (
    <Wrapper>
      <div className="img_wrapper">
        <img src="/assets/images/landing_puzzle_img.png" width="250" height="250" />
      </div>
      <div className="button_wrapper">
        <Button>로그인</Button>
        <Button fontColor="#514e4e">이용방법</Button>
      </div>
    </Wrapper>
  );
}

export default Main;
