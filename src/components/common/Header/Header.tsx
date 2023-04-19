import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { BackIcon, KeyIcon, KeyIconActive, Logo, ProfileIcon, ProfileIconActive } from 'src/core/icons';
import { AuthButton, ButtonGroup, buttonHoverCss, Wrapper } from './style';
import { usePostLogout } from 'src/module/auth/hooks/usePostLogout';
import route from 'src/core/const/route.path';
import auth from 'src/recoil/auth';
import { useSyncRecoil } from 'src/core/hooks/useSyncRecoil';
import { User } from 'src/recoil/auth/type';
import { authDefaultValue } from 'src/recoil/auth/atom';
import useMovePage from 'src/core/hooks/useMovePage';

type IconType = 'logo' | 'key' | 'myPage' | 'login' | 'logout' | 'back';
type toggleIconType = 'key' | 'myPage';

export default function Header() {
  const router = useRouter();
  const { userId } = useSyncRecoil<User>({ atom: auth, defaultValue: authDefaultValue });
  const logout = usePostLogout();

  const toMyPage = useMovePage(router, route.MyPage, router.pathname);
  const toKey = useMovePage(router, route.Key, router.pathname);
  const toList = useMovePage(router, route.List, router.pathname);
  const toBack = useMovePage(router, route.List, router.pathname);
  const toLanding = useMovePage(router, route.Landing);

  const handleClickEvent: Record<IconType, () => void> = {
    logo: () => toList(),
    login: () => toLanding(),
    back: () => toBack(),
    myPage: () => toMyPage(),
    key: () => toKey(),
    logout: () => logout.mutate(),
  };

  const handleBackToList: Record<toggleIconType, () => void> = {
    key: () => toList(),
    myPage: () => toList(),
  };

  return (
    <Wrapper>
      {router.pathname === route.MyPage || router.pathname === route.Key || router.pathname === route.HowToUse ? (
        <BackIcon onClick={handleClickEvent['back']} css={buttonHoverCss} />
      ) : (
        <Logo onClick={handleClickEvent['logo']} css={buttonHoverCss} />
      )}
      <ButtonGroup>
        {!!userId && router.pathname === route.MyPage && (
          <AuthButton onClick={handleClickEvent['logout']}>로그아웃</AuthButton>
        )}
        {userId === null ? (
          <AuthButton onClick={handleClickEvent['login']}>로그인</AuthButton>
        ) : (
          <>
            {router.pathname === route.Key ? (
              <KeyIconActive onClick={handleBackToList['key']} css={buttonHoverCss} />
            ) : (
              <KeyIcon onClick={handleClickEvent['key']} css={buttonHoverCss} />
            )}
            {router.pathname === route.MyPage ? (
              <ProfileIconActive onClick={handleBackToList['myPage']} css={buttonHoverCss} />
            ) : (
              <ProfileIcon onClick={handleClickEvent['myPage']} css={buttonHoverCss} />
            )}
          </>
        )}
      </ButtonGroup>
    </Wrapper>
  );
}
