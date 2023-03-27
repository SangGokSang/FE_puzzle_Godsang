import { useRouter } from 'next/router';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { KeyIcon, Logo, ProfileIcon } from 'src/core/icons';
import { ButtonGroup, Wrapper } from './style';

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
