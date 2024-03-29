import React from 'react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import route from 'src/core/const/route.path';
import Button, { ButtonType } from '../button/Button';
import KakaoAdFit from '../kakaoAd/kakaoAdFit';
import { useSyncRecoil } from 'src/core/hooks/useSyncRecoil';
import { User } from 'src/recoil/auth/type';
import auth from 'src/recoil/auth';
import { authDefaultValue } from 'src/recoil/auth/atom';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  max-width: 768px;
  min-width: 360px;
  margin: 0 auto;
  padding: 20px 20px 40px;
  position: relative;
  display: flex;
  flex-direction: column;
`;

const Message = styled.div`
  height: calc(100% - 47px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15px;
`;

export default function NotFound() {
  const router = useRouter();
  const { userId } = useSyncRecoil<User>({ atom: auth, defaultValue: authDefaultValue });
  const login = () => router.push(route.Landing);
  const goMyPage = () => router.push({ pathname: route.List, query: { userId } });

  return (
    <Wrapper>
      <Message>
        <div>퍼즐의 주인이 없습니다!</div>
        <div>퍼즐의 주인이 되어주세요!</div>
      </Message>
      <KakaoAdFit />
      {userId ? (
        <Button buttonType={ButtonType.Basic} onClick={goMyPage}>
          내 퍼즐판 가기
        </Button>
      ) : (
        <Button buttonType={ButtonType.Basic} onClick={login}>
          로그인 하기
        </Button>
      )}
    </Wrapper>
  );
}
