import React from 'react';
import { useRouter } from 'next/router';
import { css } from '@emotion/react';
import { useRecoilValue } from 'recoil';
import { Pathname } from 'src/core/const/enum';
import { BackIcon, KeyIcon, KeyIconActive, Logo, ProfileIcon, ProfileIconActive } from 'src/core/icons';
import { ButtonGroup, Wrapper } from './style';
import { signOut } from 'next-auth/react';

export default function Header() {
  const router = useRouter();

  // const handleLogoClick = () => {
  //   if(로그인 && 퍼즐리스트){
  //     router.push(Pathname.list);
  //   }else{
  //     router.push(Pathname.login);
  //   }
  // };

  const handleBackClick = () => {
    router.back();
  };

  const handleKeyClick = () => {
    // 임시처리
    signOut({ redirect: false });
    router.push(Pathname.key);
  };

  const handleUserClick = () => {
    router.push(Pathname.myPage);
  };

  return (
    <Wrapper>
      {router.pathname === Pathname.myPage ? <BackIcon onClick={handleBackClick} /> : <Logo />}

      <ButtonGroup>
        {router.pathname === Pathname.key ? (
          <KeyIconActive onClick={handleKeyClick} />
        ) : (
          <KeyIcon onClick={handleKeyClick} />
        )}
        {router.pathname === Pathname.myPage ? (
          <ProfileIconActive onClick={handleUserClick} />
        ) : (
          <ProfileIcon onClick={handleUserClick} />
        )}
      </ButtonGroup>
    </Wrapper>
  );
}
