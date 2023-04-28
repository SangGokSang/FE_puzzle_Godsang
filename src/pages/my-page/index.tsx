import React, { useMemo } from 'react';
import { css } from '@emotion/react';
import Layout from 'src/components/common/Layout';
import styled from '@emotion/styled';
import dayjs from 'dayjs';
import { getDDay } from 'src/core/util/util';
import auth from 'src/recoil/auth';
import { useSyncRecoil } from 'src/core/hooks/useSyncRecoil';
import { authDefaultValue } from 'src/recoil/auth/atom';
import { User as RecoilUser } from 'src/recoil/auth/type';
import Image from 'next/image';
import KakaoAdFit from 'src/components/kakaoAd/kakaoAdFit';
import route from 'src/core/const/route.path';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';
import { CustomLink } from 'src/core/styles/common';

export type MyPage = {
  countNextAge: number;
  dDay: number;
  countMeals: number;
  countBooks: number;
  countBodyProfile: number;
};

const layoutCss = css`
  .wrapper {
    width: 100%;
    height: 100%;
    padding-top: 25%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`;
const MyPageSection = styled.section`
  width: 100%;
  height: calc(100% - 30px);
  display: flex;
`;

const StoryLine = styled.div`
  width: 500px;
  padding-top: 40px;
  font-weight: 400;
  font-size: 20px;
  line-height: 26px;
  display: flex;
  flex-direction: column;
  gap: 25px;

  @media screen and (min-width: 768px) {
    width: 100%;
    padding-top: 10%;
  }
`;

const Story = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  .list {
    margin-left: 10px;
    display: flex;
    gap: 8px;
    flex-direction: column;
    .row {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 12px;
    }
  }
`;

export const ButtonSection = styled.section`
  width: 100%;
  height: 85px;
  position: absolute;
  bottom: 0;
`;

function MyPage() {
  const { nickname, birthdate } = useSyncRecoil<RecoilUser>({ atom: auth, defaultValue: authDefaultValue });
  const router = useRouter();

  const description = useMemo(() => {
    const d_day = getDDay(dayjs(birthdate));
    const countMeals = d_day * 3; // 하루에 3끼 (남은일수 * 3)
    const countSquat = d_day * 60; // 하루에 60개 기준 (남은일수 * 60)
    const countOnePerWeeks = Math.floor(d_day / 7); // 일주일에 한 번 기준
    const countFishing = Math.floor((d_day / 7) * 20); // 일주일에 한 번 기준 20 번 캐스팅
    const countCoding = d_day * 100; // 하루에 100줄
    const countLoL = d_day * 2; // 하루에 2판 기준
    const countTravel = Math.round(d_day / 365); // 일년에 2번 기준
    const getUrl = (type: string) => `/assets/images/mypage/${type}.png`;
    const koreanAge = dayjs().year() - dayjs(birthdate).year() + 1; // 한국나이
    const subtractAge = Math.ceil(d_day / 365);
    console.log(d_day / 365);

    return (
      <div
        css={css`
          font-size: 13px;
          display: flex;
          flex-direction: column;
          gap: 15px;
        `}>
        <div>
          <span>{nickname} 님 축하드려요!</span>
          <div>
            만 나이가 적용이 되면서 {koreanAge} 세 에서 {subtractAge} 살이 어려지고
          </div>
          <span>{d_day} 일 만큼의 시간을 선물로 받았어요 🥳</span>
          <p>선물받은 시간동안 우리가 할 수 있는 것을 알아볼까요?</p>
        </div>
        <div className="list">
          <div className="row">
            <Image src={getUrl('lunch')} alt="밥" width="35" height="35" />
            먹는게~ 제일 좋아~🎶 {countMeals} 끼 더 버억~
          </div>
          <div className="row">
            <Image src={getUrl('squat')} alt="스쿼트" width="35" height="35" />
            원판 더더!! 스퀕 {countSquat} 회 더 할 수 있어요!
          </div>
          <div className="row">
            <Image src={getUrl('book')} alt="책" width="35" height="35" />
            {countOnePerWeeks} 권을 더 읽어서 척척박사로 진화!
          </div>
          <div className="row">
            <Image src={getUrl('airplane')} alt="비행" width="35" height="35" />
            {countTravel} 번의 여행! 세계를 정복해봐요!
          </div>
          <div className="row">
            <Image src={getUrl('lol')} alt="롤" width="35" height="35" />
            캐리 미쳤네? {countLoL} 판 더하고 챌린저!
          </div>
          <div className="row">
            <Image src={getUrl('cycling')} alt="싸이클링" width="35" height="35" />
            한강 라이딩 궈궈? {countOnePerWeeks} 번의 라이딩 질주!
          </div>
          <div className="row">
            <Image src={getUrl('fishing')} alt="낚시" width="35" height="35" />
            9자 농어 잡자! {countFishing} 번 더 캐스팅!
          </div>
          <div className="row">
            <Image src={getUrl('programming')} alt="코딩" width="35" height="35" />
            나는야 코딩왕. {countCoding} 라인 더 코딩하기!
          </div>
          <div className="row">
            <Image src={getUrl('hiking')} alt="롤" width="35" height="35" />
            이번 주는 한라산이다! {countOnePerWeeks} 번 더 도전해보기!
          </div>
        </div>
      </div>
    );
  }, [birthdate]);

  return (
    <Layout layoutCss={layoutCss} useHeader={true}>
      <MyPageSection>
        <StoryLine>
          <Story>{description}</Story>
          <div
            css={css`
              display: flex;
              flex-direction: column;
            `}>
            <CustomLink onClick={() => router.push(route.PrivacyUpdate)}>회원정보 수정 바로가기</CustomLink>
            <CustomLink onClick={() => router.push(route.privacyPolicy)}>개인정보 처리방침 바로가기</CustomLink>
            <CustomLink onClick={() => router.push(route.HowToUse)}>이용방법 바로가기</CustomLink>
          </div>
        </StoryLine>
      </MyPageSection>
      <KakaoAdFit
        css={css`
          position: fixed;
          bottom: 0;
        `}
      />
    </Layout>
  );
}

export async function getServerSideProps(context: any) {
  const session = await getSession(context);
  if (session === null) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  return { props: {} };
}

export default MyPage;
