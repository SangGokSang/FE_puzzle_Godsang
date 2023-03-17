import React from 'react';
import { useRecoilValue } from 'recoil';
import { KeyIcon, Logo, ProfileIcon } from 'src/core/icons';
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
