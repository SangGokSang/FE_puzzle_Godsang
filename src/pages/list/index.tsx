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
import puzzle1 from 'public/assets/images/puzzle-1.png';
import puzzle2 from 'public/assets/images/puzzle-2.png';
import puzzle3 from 'public/assets/images/puzzle-3.png';
import puzzle4 from 'public/assets/images/puzzle-4.png';
import puzzle5 from 'public/assets/images/puzzle-5.png';
import puzzle6 from 'public/assets/images/puzzle-6.png';
import puzzle7 from 'public/assets/images/puzzle-7.png';
import puzzle8 from 'public/assets/images/puzzle-8.png';
import puzzle9 from 'public/assets/images/puzzle-9.png';
import { PuzzleMSG, usePuzzles } from 'src/module/puzzles';
import Letter from 'src/components/Popup/Letter';
import { AddPuzzleIcon } from 'src/core/icons';
import { useRouter } from 'next/router';
import route from 'src/core/const/route.path';
import { css } from '@emotion/react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

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

// queryParam ?userId=1 으로 유저아이디 가져오기
// 임시로 d 넣어놨어요. 내용 구현해주세요!
function PuzzleList({ d }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const puzzlePosition = [{ left: 0, top: 0 }];
  const { data } = usePuzzles();
  const router = useRouter();
  const [letterData, setLetterData] = useState<PuzzleMSG | null>(null);

  const handleClickPiece = (data: any) => setLetterData(null);
  const handleClose = () => setLetterData(null);

  const handleClickShare = useCallback(() => {
    //
  }, []);

  const handleClickMakePuzzle = () => {
    router.push(route.Create);
  };

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
    if (router.pathname === route.List && router.query.userId === undefined) {
      location.href =
        process.env.NODE_ENV === 'production'
          ? 'https://dearmy2023.click'
          : process.env.NODE_ENV === 'development'
          ? 'http://localhost:3000'
          : '';
    }
  }, []);

  return (
    <Layout>
      <PuzzleListWrap>
        <Content>
          <div css={title}>별명님의 목표</div>
          <SwiperContainer>
            <Swiper pagination={true} modules={[Pagination]}>
              {data && !!data.length ? (
                data.map((puzzle, index) => (
                  <div key={puzzle.id}>
                    {index === 0 && puzzle?.messages?.length === 9 && (
                      <SwiperSlide>
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
                          {PUZZLE_LIST.map((data, index) => (
                            <PuzzlePiece
                              key={index}
                              src={data}
                              position={getPuzzlePosition(index)}
                              alt="puzzle-piece"
                              onClick={() => handleClickPiece(data)}
                            />
                          ))}
                        </PuzzleWrap>
                      </PuzzleContainer>
                    </SwiperSlide>
                  </div>
                ))
              ) : (
                <NoPuzzleWrap>
                  <AddPuzzleIcon onClick={handleClickMakePuzzle} />
                  <p>퍼즐을 만들어보세요!</p>
                </NoPuzzleWrap>
              )}
            </Swiper>
          </SwiperContainer>
          <Message>친구에게 공유해서 퍼즐조각을 완성해보세요!</Message>
        </Content>
        <Button buttonType={ButtonType.Basic} onClick={handleClickShare}>
          공유하기
        </Button>
      </PuzzleListWrap>
      <Letter isOpen={!!letterData} onClose={handleClose} data={letterData} />
    </Layout>
  );
}

// query 의 userId 를 request param 으로 보내주세요.
export const getServerSideProps: GetServerSideProps<{ d: unknown }> = async ({ query }) => {
  console.log(query.userId);
  return {
    props: {
      d: '',
    },
  };
};

export default PuzzleList;
