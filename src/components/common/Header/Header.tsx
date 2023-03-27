import { useRouter } from 'next/router';
import React from 'react';
import styled from '@emotion/styled';
import { cx } from '@emotion/css';
import { css } from '@emotion/react';
import { AppBar, Avatar, Chip } from '@mui/material';
import { useRecoilValue } from 'recoil';
import isMobile from 'src/core/recoil/isMobile';
import landing_header_img from '/assets/images/header.svg';

const Wrapper = styled.header`
  width: 100%;
  /* margin-top: 50px; */
  display: flex;
  justify-content: center;

  /* @media screen and (max-width: 768px) {
    width: 100%;
  } */
`;

export default function Header() {
  const router = useRouter();

  // const handleMainClick = () => {
  //   if(로그인 && 퍼즐리스트 있으면){
  //     router.push('/list');
  //   }else{
  //     router.push('');
  //   }
  // };

  const handleProfileClick = () => {
    router.push('myPage');
  };

  const handleKeyClick = () => {
    router.push('key');
  };

  return (
    <Wrapper>
      <Logo />
      <ButtonGroup>
        <KeyIcon onClick={handleKeyClick} />
        <ProfileIcon onClick={handleProfileClick} />
      </ButtonGroup>
    </Wrapper>
  );
}
