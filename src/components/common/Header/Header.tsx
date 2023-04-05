import React from 'react';
import { useRouter } from 'next/router';
import { BackIcon, KeyIcon, KeyIconActive, Logo, ProfileIcon, ProfileIconActive } from 'src/core/icons';
import { ButtonGroup, Wrapper } from './style';
import { usePostLogout } from 'src/module/auth/hooks/usePostLogout';
import route from 'src/core/const/route.path';
import { useRecoilValue } from 'recoil';
import auth from 'src/recoil/auth';

export default function Header() {
  const router = useRouter();
  const user = useRecoilValue(auth);
  const logout = usePostLogout();
  const handleLogoClick = () => {
    logout.mutate();
  };

  const handleBackClick = () => {
    router.push({ pathname: route.List, query: { userId: user.userId } });
  };

  const handleKeyClick = () => {
    router.push(route.Key);
  };

  const handleUserClick = () => {
    router.push(route.MyPage);
  };

  return (
    <Wrapper>
      {router.pathname === route.MyPage || router.pathname === route.Key ? (
        <BackIcon onClick={handleBackClick} />
      ) : (
        <Logo onClick={handleLogoClick} />
      )}
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
