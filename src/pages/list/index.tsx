import React, { useCallback, useEffect, useState } from 'react';
import Button from 'src/components/button';
import { ButtonType } from 'src/components/button/Button';
import Layout from 'src/components/common/Layout';
import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import styled from '@emotion/styled';
import Image from 'next/image';
import { fetchPuzzles, Puzzle, PuzzleMSG, PUZZLES_KEY } from 'src/module/puzzles';
import Letter from 'src/components/Popup/Letter';
import { AddPuzzleIcon } from 'src/core/icons';
import { useRouter } from 'next/router';
import route from 'src/core/const/route.path';
import { css } from '@emotion/react';
import { GetServerSideProps } from 'next';
import copy from 'copy-to-clipboard';
import { useRecoilValue } from 'recoil';
import auth from 'src/recoil/auth';
import isMobile from 'src/recoil/isMobile';
import { useSnackbar } from 'notistack';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { ApiError } from 'src/core/type/ApiError';
import { usePuzzles } from 'src/module/puzzles/hooks';

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const PuzzleListWrap = styled.div`
  height: 100%;
`;

const Content = styled.div`
  width: 100%;
  height: calc(100% - 60px);
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const title = css`
  font-size: 22px;
  font-weight: 400;
  line-height: 33px;
  color: #000000;
`;

const goal = css`
  font-size: 13px;
  font-weight: 400;
  line-height: 20px;
  color: #727272;
  max-width: 234px;
  height: 40px;
  margin-top: 6px;
  margin-bottom: 20px;
  word-wrap: break-word;
  word-break: normal;
`;

const SwiperContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;

  .swiper {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .swiper-wrapper {
    height: fit-content;
  }

  .swiper-slide {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .swiper-pagination {
    height: 10px;
    display: flex;
    justify-content: center;
    gap: 13px;
    position: unset;
    margin-top: 15px;

    .swiper-pagination-bullet {
      width: 10px;
      height: 10px;
      margin: 0 !important;
      background: #fff;
      border: 1px solid #000;
      opacity: 1;
    }

    .swiper-pagination-bullet-active {
      background: #000000;
    }
  }
`;

const PuzzleContainer = styled.div`
  display: flex;
  align-items: center;
`;

const PuzzleWrap = styled.div`
  width: 270px;
  height: 270px;
  border-radius: 6px;
  background-color: #f3f3f3;
  position: relative;
`;

const PuzzlePiece = styled(Image)<{ position: { left: number; top: number } }>`
  position: absolute;
  left: ${({ position: { left } }) => left}px;
  top: ${({ position: { top } }) => top}px;
`;

const NoPuzzleWrap = styled.div`
  min-width: 270px;
  height: 270px;
  display: flex;
  gap: 15px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f3f3f3;
  white-space: nowrap;
  margin-top: 66px;
`;

const Message = styled.div`
  font-size: 13px;
  font-weight: 400;
  line-height: 20px;
  margin: 20px 0 15px;
`;

function PuzzleList() {
  const router = useRouter();
  const isMobileView = useRecoilValue(isMobile);
  const { userId: authUserId } = useRecoilValue(auth);
  const [letterData, setLetterData] = useState<PuzzleMSG | number | null>(null);
  const [loginUserId, setLoginUserId] = useState<number | null>(null);
  const [isUser, setIsUser] = useState<boolean>(false);
  const { enqueueSnackbar } = useSnackbar();

  const { data } = usePuzzles(router.query.userId as string);

  const puzzlePosition = [
    { left: 0, top: 0 },
    { left: 77.5, top: 0 },
    { left: 180, top: 0 },
    { left: 0, top: 90 },
    { left: 90, top: 90 },
    { left: 167.5, top: 90 },
    { left: 0, top: 180 },
    { left: 90, top: 167.5 },
    { left: 167.5, top: 180 },
  ];

  const puzzleSize = [
    { width: 90, height: 102.5 },
    { width: 115, height: 102.5 },
    { width: 90, height: 102.5 },
    { width: 102.5, height: 102.5 },
    { width: 90, height: 90 },
    { width: 102.5, height: 102.5 },
    { width: 102.5, height: 90 },
    { width: 90, height: 102.5 },
    { width: 102.5, height: 90 },
  ];

  const handleClickPiece = (data: any) => () => {
    if (isUser) {
      setLetterData(data);
    }
  };
  const handleClose = () => {
    setLetterData(null);
  };

  const handleClickShare = useCallback(() => {
    if (navigator.share) {
      navigator.share({
        title: 'Dear My 2023',
        text: '우리에게 선물로 다가온 시간을 채워봐요.',
        url: location.href,
      });
    } else {
      copy(location.href);
      if (!isMobileView) {
        enqueueSnackbar('링크를 복사했습니다.');
      }
    }
  }, [isMobileView]);

  const handleClickMakePuzzle = () => {
    router.push(route.Create);
  };

  const handleClickSendMessage = useCallback(() => {
    setLetterData(data?.length ? data[0].id : null); // 가장 마지막에 생성된 퍼즐 id
  }, [data]);

  const getUrl = useCallback((categories: string, index: number) => {
    const category = categories.toLowerCase();

    return `/assets/images/puzzles/${category}/${category}${index}.png`;
  }, []);

  // queryParam 을 안달고 있는 경우 index 페이지로 랜딩, 초기 딱 한번 실행
  useEffect(() => {
    if (router.pathname === route.List && !router.query.userId) {
      location.href =
        process.env.NODE_ENV === 'production'
          ? 'https://dearmy2023.click'
          : process.env.NODE_ENV === 'development'
          ? 'http://localhost:3000'
          : '';
    }
  }, []);

  useEffect(() => setLoginUserId(authUserId), [authUserId]);
  useEffect(() => setIsUser(Number(loginUserId) === Number(router.query.userId)), [router.query.userId, loginUserId]);

  return (
    <Layout>
      <PuzzleListWrap>
        <Content>
          <div css={title}>{data?.length ? data[0]?.userNickname : '별명'} 님의 목표</div>
          <SwiperContainer>
            <Swiper pagination={true} modules={[Pagination]}>
              {data && !!data.length ? (
                <>
                  {data.map((puzzle, index) => (
                    <div key={puzzle.id}>
                      {isUser && index === 0 && puzzle?.messages?.length === 9 && (
                        <SwiperSlide key={'create'}>
                          <NoPuzzleWrap>
                            <AddPuzzleIcon onClick={handleClickMakePuzzle} />
                            <p>퍼즐을 만들어보세요!</p>
                          </NoPuzzleWrap>
                        </SwiperSlide>
                      )}
                      <SwiperSlide key={puzzle.id}>
                        <div css={goal}>{puzzle.title}</div>
                        <PuzzleContainer>
                          <PuzzleWrap>
                            {puzzle.messages.map((message) => (
                              <PuzzlePiece
                                key={message.displayOrder}
                                src={getUrl(puzzle.category, message.displayOrder)}
                                position={puzzlePosition[message.displayOrder]}
                                alt="puzzle-piece"
                                onClick={handleClickPiece(message)}
                                {...puzzleSize[message.displayOrder]}
                              />
                            ))}
                          </PuzzleWrap>
                        </PuzzleContainer>
                      </SwiperSlide>
                    </div>
                  ))}
                  {isUser && (
                    <SwiperSlide key={'create-test'}>
                      <NoPuzzleWrap>
                        <AddPuzzleIcon onClick={handleClickMakePuzzle} />
                        <p>퍼즐을 만들어보세요!</p>
                      </NoPuzzleWrap>
                    </SwiperSlide>
                  )}
                </>
              ) : (
                <NoPuzzleWrap>
                  {isUser ? (
                    <>
                      <AddPuzzleIcon onClick={handleClickMakePuzzle} />
                      <p>퍼즐을 만들어보세요!</p>
                    </>
                  ) : (
                    <div>아직 퍼즐이 생성되지 않았어요!</div>
                  )}
                </NoPuzzleWrap>
              )}
            </Swiper>
          </SwiperContainer>
          <Message>
            {isUser ? '친구에게 공유해서 퍼즐조각을 완성해보세요!' : '아래 버튼을 클릭해 응원의 메세지를 보내주세요!'}
          </Message>
        </Content>
        <Button buttonType={ButtonType.Basic} onClick={isUser ? handleClickShare : handleClickSendMessage}>
          {isUser ? '공유하기' : 'DM 보내기'}
        </Button>
      </PuzzleListWrap>
      <Letter isOpen={!!letterData} onClose={handleClose} data={letterData} isWrite={!isUser} />
    </Layout>
  );
}

export default PuzzleList;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const userId = query.userId as string;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery<Puzzle[], ApiError>([PUZZLES_KEY], () => fetchPuzzles(userId));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
