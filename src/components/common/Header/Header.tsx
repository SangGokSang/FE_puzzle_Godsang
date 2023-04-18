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
import { ParsedUrlQueryInput } from 'querystring';

type IconType = 'logo' | 'key' | 'myPage' | 'login' | 'logout' | 'back';

export default function Header() {
  const router = useRouter();
  const { userId } = useSyncRecoil<User>({ atom: auth, defaultValue: authDefaultValue });
  const logout = usePostLogout();
  const [keyIsToggled, setKeyIsToggled] = useState<boolean>(false);
  const [myPageIsToggled, setMyPageIsToggled] = useState<boolean>(false);

  const movePage = (pathname: string, query?: ParsedUrlQueryInput) => {
    router.push({ pathname, query });
  };

  const handleClickEvent: Record<IconType, () => void> = {
    logo: () => movePage(route.List, { userId }),
    login: () => movePage(route.Landing),
    back: () =>
      router.pathname === route.HowToUse ? router.back() : movePage(route.List, { userId: router.query.originId }),
    myPage: () =>
      movePage(route.MyPage, {
        originId:
          router.pathname === route.Key || router.pathname === route.MyPage || router.pathname === route.MakeKey
            ? router.query.originId
            : router.query.userId,
      }),
    key: () => {
      if (router.pathname === route.Key) {
        if (keyIsToggled) {
          setKeyIsToggled(false);
          movePage(route.List, { userId });
        } else {
          setKeyIsToggled(true);
          movePage(route.Key, {
            originId:
              router.pathname === route.MyPage || router.pathname === route.Key || router.pathname === route.MakeKey
                ? router.query.originId
                : router.query.userId,
          });
        }
      } else {
        movePage(route.Key, {
          originId:
            router.pathname === route.MyPage || router.pathname === route.Key || router.pathname === route.MakeKey
              ? router.query.originId
              : router.query.userId,
        });
      }
    },
    logout: () => logout.mutate(),
  };
  console.log(keyIsToggled);
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
