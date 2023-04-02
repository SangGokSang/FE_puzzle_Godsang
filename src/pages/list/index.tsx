import React, { useCallback, useState } from 'react';
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
import { PuzzleMSG } from 'src/module/puzzles';
import Letter from 'src/components/Popup/Letter/Letter';

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
`;

const Goal = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  text-align: center;

  .title {
    font-size: 22px;
    font-weight: 400;
    line-height: 33px;
    color: #000000;
  }
  .description {
    font-size: 13px;
    font-weight: 400;
    line-height: 20px;
    color: #727272;
    max-width: 234px;
    word-wrap: break-word;
    word-break: normal;
  }
`;

const SwiperContainer = styled.div`
  width: 100%;
  height: 305px;
  margin-top: 20px;

  .swiper {
    height: 100%;
  }
  .swiper-wrapper {
    height: fit-content;
  }

  .swiper-slide {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .swiper-pagination {
    height: 10px;
    display: flex;
    justify-content: center;
    gap: 13px;
    bottom: 0 !important;

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

const Message = styled.div`
  font-size: 13px;
  font-weight: 400;
  line-height: 20px;
  margin: 20px 0 15px;
`;

function PuzzleList() {
  const puzzlePosition = [{ left: 0, top: 0 }];
  usePuzzles();
  const [letterData, setLetterData] = useState<PuzzleMSG | null>(null);

  const handleClickPiece = (data: any) => setLetterData(null);
  const handleClose = () => setLetterData(null);

  const handleClickShare = useCallback(() => {
    //
  }, []);

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

  return (
    <Layout>
      <PuzzleListWrap>
        <Content>
          <Goal>
            <div className="title">별명님의 목표</div>
            <div className="description">저의 목표는 어쩌고 저쩌고 응원 부탁 ^^~</div>
          </Goal>
          <SwiperContainer>
            <Swiper pagination={true} modules={[Pagination]}>
              <SwiperSlide>
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
              </SwiperSlide>
              <SwiperSlide>
                <PuzzleWrap>puzzle</PuzzleWrap>
              </SwiperSlide>
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

export default PuzzleList;
