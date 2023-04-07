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
import puzzle1 from 'public/assets/images/puzzles/test/puzzle-1.png';
import puzzle2 from 'public/assets/images/puzzles/test/puzzle-2.png';
import puzzle3 from 'public/assets/images/puzzles/test/puzzle-3.png';
import puzzle4 from 'public/assets/images/puzzles/test/puzzle-4.png';
import puzzle5 from 'public/assets/images/puzzles/test/puzzle-5.png';
import puzzle6 from 'public/assets/images/puzzles/test/puzzle-6.png';
import puzzle7 from 'public/assets/images/puzzles/test/puzzle-7.png';
import puzzle8 from 'public/assets/images/puzzles/test/puzzle-8.png';
import puzzle9 from 'public/assets/images/puzzles/test/puzzle-9.png';
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
import { usePuzzles } from 'src/module/puzzles/hooks/useFetchPuzzles';

const PUZZLE_SIZE = 90;
const PUZZLE_ROUND_SIZE = 18;
const PUZZLE_LIST = [puzzle1, puzzle2, puzzle3, puzzle4, puzzle5, puzzle6, puzzle7, puzzle8, puzzle9];

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

const PuzzlePiece = styled(Image)<{ position: [number, number] }>`
  position: absolute;
  left: ${({ position }) => position[0]}px;
  top: ${({ position }) => position[1]}px;
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
  const puzzlePosition = [{ left: 0, top: 0 }];
  const router = useRouter();
  const isMobileView = useRecoilValue(isMobile);
  const { userId: authUserId } = useRecoilValue(auth);
  const [letterData, setLetterData] = useState<PuzzleMSG | number | null>(null);
  const [loginUserId, setLoginUserId] = useState<number | null>(null);
  const [isUser, setIsUser] = useState<boolean>(false);
  const { enqueueSnackbar } = useSnackbar();

  const { data } = usePuzzles(router.query.userId as string);

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

  const getPuzzlePosition = useCallback((index: number): [number, number] => {
    const row = Math.floor(index / 3);
    const col = index % 3;
    const leftPuzzleIndex = col ? index - 1 : 0;
    const topPuzzleIndex = row ? index - 3 : 0;
    const leftPuzzleW = PUZZLE_LIST[leftPuzzleIndex].width;
    const topPuzzleH = PUZZLE_LIST[topPuzzleIndex].height;
    const leftPuzzlePosition = col ? puzzlePosition[leftPuzzleIndex].left + leftPuzzleW : 0;
    const topPuzzlePosition = row ? puzzlePosition[topPuzzleIndex].top + topPuzzleH : 0;
    const originX = col * PUZZLE_SIZE;
    const originY = row * PUZZLE_SIZE;
    const puzzleX = originX ? (originX < leftPuzzlePosition ? originX : originX - PUZZLE_ROUND_SIZE) : 0;
    const puzzleY = originY ? (originY < topPuzzlePosition ? originY : originY - PUZZLE_ROUND_SIZE) : 0;

    index && puzzlePosition.push({ left: puzzleX, top: puzzleY });
    return [puzzleX, puzzleY];
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
                      {index === 0 && puzzle?.messages?.length === 9 && (
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
                            {puzzle.messages.map((message, index) => (
                              <PuzzlePiece
                                key={index}
                                src={PUZZLE_LIST[index]}
                                position={getPuzzlePosition(index)}
                                alt="puzzle-piece"
                                onClick={handleClickPiece(message)}
                                placeholder="blur"
                              />
                            ))}
                          </PuzzleWrap>
                        </PuzzleContainer>
                      </SwiperSlide>
                    </div>
                  ))}
                  <SwiperSlide key={'create-test'}>
                    <NoPuzzleWrap>
                      <AddPuzzleIcon onClick={handleClickMakePuzzle} />
                      <p>퍼즐을 만들어보세요!</p>
                    </NoPuzzleWrap>
                  </SwiperSlide>
                </>
              ) : (
                <NoPuzzleWrap>
                  <AddPuzzleIcon onClick={handleClickMakePuzzle} />
                  <p>퍼즐을 만들어보세요!</p>
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
