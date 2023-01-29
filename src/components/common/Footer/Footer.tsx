import React from 'react';
import styled from '@emotion/styled';

const Wrapper = styled.footer`
  width: 100%;
  height: 60px;
  padding: 0 12px;
  position: fixed;
  left: 0px;
  bottom: 0px;
  background: rgba(248, 248, 248, 0.8);
  box-shadow: inset 0px 0.5px 3px rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: space-around;
  align-items: center;

  @media screen and (min-width: 768px) {
    width: 768px;
    margin: 0 auto;
    left: 0;
    right: 0;
  }
`;

const Button = styled.button`
  width: 120px;
  height: 80%;
  background-color: rgba(255, 255, 255, 0);
  color: #ab9191;
  text-shadow: 0px 4px 4px #efd6ff;
  font-weight: 500;
  font-size: 14px;
  line-height: 26px;
  border: none;
`;

const VerticalLine = styled.hr`
  height: 70%;
  margin: 0;
  border: 0.1px solid rgba(0, 0, 0, 0.1);
`;

export default function Footer() {
  return (
    <Wrapper>
      <Button>이용방법</Button>
      <VerticalLine />
      <Button>로그인</Button>
    </Wrapper>
  );
}
