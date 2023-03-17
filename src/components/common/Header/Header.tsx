import React from 'react';
import { useRecoilValue } from 'recoil';
import { KeyIcon, Logo, ProfileIcon } from 'src/core/icons';
import isMobile from 'src/core/recoil/isMobile';
import { ButtonGroup, Wrapper } from './style';

export default function Header() {
  return (
    <Wrapper>
      <Logo />
      <ButtonGroup>
        <KeyIcon />
        <ProfileIcon />
      </ButtonGroup>
    </Wrapper>
  );
}
