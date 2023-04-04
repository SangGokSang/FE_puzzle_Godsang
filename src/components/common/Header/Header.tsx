import React from 'react';
import { useRouter } from 'next/router';
import { BackIcon, KeyIcon, KeyIconActive, Logo, ProfileIcon, ProfileIconActive } from 'src/core/icons';
import { ButtonGroup, Wrapper } from './style';
import { usePostLogout } from 'src/module/auth/hooks/usePostLogout';
import route from 'src/core/const/route.path';

export default function Header() {
  const router = useRouter();
  const logout = usePostLogout();
  const handleLogoClick = () => {
    logout.mutate();
  };

  const handleBackClick = () => {
    router.back();
  };

  const handleKeyClick = () => {
    router.push(route.Key);
  };

  const handleUserClick = () => {
    router.push(route.MyPage);
  };

  return (
    <Wrapper>
      {router.pathname === route.MyPage ? <BackIcon onClick={handleBackClick} /> : <Logo onClick={handleLogoClick} />}
      <ButtonGroup>
        {router.pathname === route.Key ? (
          <KeyIconActive onClick={handleKeyClick} />
        ) : (
          <KeyIcon onClick={handleKeyClick} />
        )}
        {router.pathname === route.MyPage ? (
          <ProfileIconActive onClick={handleUserClick} />
        ) : (
          <ProfileIcon onClick={handleUserClick} />
        )}
      </ButtonGroup>
    </Wrapper>
  );
}
