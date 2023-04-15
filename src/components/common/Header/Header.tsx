import React from 'react';
import { useRouter } from 'next/router';
import { BackIcon, KeyIcon, KeyIconActive, Logo, ProfileIcon, ProfileIconActive } from 'src/core/icons';
import { AuthButton, ButtonGroup, buttonHoverCss, Wrapper } from './style';
import { usePostLogout } from 'src/module/auth/hooks/usePostLogout';
import route from 'src/core/const/route.path';
import auth from 'src/recoil/auth';
import { useSyncRecoil } from 'src/core/hooks/useSyncRecoil';
import { User } from 'src/recoil/auth/type';
import { authDefaultValue } from 'src/recoil/auth/atom';
import { useMovePage } from 'src/core/util/util';

type IconType = 'logo' | 'key' | 'myPage' | 'login' | 'logout' | 'back';

export default function Header() {
  const router = useRouter();
  const { userId } = useSyncRecoil<User>({ atom: auth, defaultValue: authDefaultValue });
  const logout = usePostLogout();

  const moveToList = useMovePage(router, route.List, { userId });
  const moveToLogin = useMovePage(router, route.Landing);
  const moveToBack = useMovePage(router, route.List, { userId: router.query.originId });
  const moveToMyPage = useMovePage(router, route.MyPage, {
    originId:
      router.pathname === route.Key || router.pathname === route.MakeKey ? router.query.originId : router.query.userId,
  });
  const moveToKey = useMovePage(router, route.Key, {
    originId:
      router.pathname === route.MyPage || router.pathname === route.MakeKey
        ? router.query.originId
        : router.query.userId,
  });

  const handleClickEvent: Record<IconType, () => void> = {
    logo: () => moveToList(),
    login: () => moveToLogin(),
    back: () => (router.pathname === route.HowToUse ? router.back() : moveToBack()),
    myPage: () => moveToMyPage(),
    key: () => moveToKey(),
    logout: () => {
      localStorage.clear();
      logout.mutate();
    },
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
              <KeyIconActive onClick={handleClickEvent['key']} css={buttonHoverCss} />
            ) : (
              <KeyIcon onClick={handleClickEvent['key']} css={buttonHoverCss} />
            )}
            {router.pathname === route.MyPage ? (
              <ProfileIconActive onClick={handleClickEvent['myPage']} css={buttonHoverCss} />
            ) : (
              <ProfileIcon onClick={handleClickEvent['myPage']} css={buttonHoverCss} />
            )}
          </>
        )}
      </ButtonGroup>
    </Wrapper>
  );
}
