import { useRouter } from 'next/router';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { Pathname } from 'src/core/const/enum';
import { BackIcon, KeyIcon, Logo, ProfileIcon } from 'src/core/icons';
import { ButtonGroup, Wrapper } from './style';

export default function Header() {
  const router = useRouter();

  // const handleLogoClick = () => {
  //   if(로그인 && 퍼즐리스트 있으면){
  //     router.push(Pathname.list);
  //   }else{
  //     router.push(Pathname.create);
  //   }
  // };

  const handleBackClick = () => {
    router.back();
  };

  const handleKeyClick = () => {
    router.push(Pathname.key);
  };

  const handleUserClick = () => {
    router.push(Pathname.myPage);
  };

  return (
    <Wrapper>
      {router.pathname === Pathname.myPage ? <BackIcon onClick={handleBackClick} /> : <Logo />}

      <ButtonGroup>
        <KeyIcon onClick={handleKeyClick} />
        <ProfileIcon onClick={handleUserClick} />
      </ButtonGroup>
    </Wrapper>
  );
}
