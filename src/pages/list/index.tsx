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
import { fetchPuzzles, PuzzleMSG, Puzzles, PUZZLES_KEY } from 'src/module/puzzles';
import Letter from 'src/components/Popup/Letter';
import { AddPuzzleIcon, DeleteIcon } from 'src/core/icons';
import { useRouter } from 'next/router';
import route from 'src/core/const/route.path';
import { css } from '@emotion/react';
import { GetServerSideProps } from 'next';
import copy from 'copy-to-clipboard';
import { useRecoilValue } from 'recoil';
import auth from 'src/recoil/auth';
import isMobile from 'src/recoil/isMobile';
import { useSnackbar } from 'notistack';
import { dehydrate, QueryClient, useQueryClient } from '@tanstack/react-query';
import { ApiError } from 'src/core/type/ApiError';
import { useDeletePuzzle, usePuzzles, useReadMessage } from 'src/module/puzzles/hooks';
import { useSyncRecoil } from 'src/core/hooks/useSyncRecoil';
import { User } from 'src/recoil/auth/type';
import { authDefaultValue } from 'src/recoil/auth/atom';
import { KEY_INFO_KEY, useGetKeyInfo } from 'src/module/keyInfo';

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
  display: flex;
  text-align: center;
  gap: 3px;
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

const NoMessage = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

function PuzzleList() {
  const router = useRouter();
  const client = useQueryClient();
  const isMobileView = useRecoilValue(isMobile);
  const [letterData, setLetterData] = useState<(PuzzleMSG & { puzzleId: number }) | number | null>(null);
  const { userId, nickname } = useSyncRecoil<User>({ atom: auth, defaultValue: authDefaultValue });
  const [isUser, setIsUser] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeSliderId, setActiveSliderId] = useState(0);
  const { enqueueSnackbar } = useSnackbar();
  const MaxMessage = 9;

  const { data } = usePuzzles(router.query.userId as string);

  const { data: key } = useGetKeyInfo({
    enabled: !!userId,
  });
  const readMessage = useReadMessage({
    onSuccess: ({ list, keyCount }) => {
      client.setQueryData([PUZZLES_KEY, `${userId}`], list);
      client.setQueryData([KEY_INFO_KEY], keyCount);
      setIsOpen(true);
    },
  });
  const deletePuzzle = useDeletePuzzle({
    onSuccess: (data) => client.setQueryData([PUZZLES_KEY, `${userId}`], data),
  });

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

  const handleClickPiece = (data: PuzzleMSG, puzzleId: number) => async () => {
    if (isUser) {
      setLetterData({ ...data, puzzleId });
      if (!data.isOpened) {
        if (key?.keyCount === 0) {
          return alert('보유하고 있는 열쇠가 없습니다! 열쇠를 획득해주세요!');
        }
        if (confirm('열쇠를 사용하여 DM을 열어보시겠나요?')) {
          readMessage.mutate({ messageId: data.id, puzzleId });
        }
      } else {
        setIsOpen(true);
      }
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleClickShare = useCallback(async () => {
    if (navigator.share) {
      navigator.share({
        title: 'Dear My 2023',
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
    setLetterData(data ? data[activeSliderId].id : null);
    setIsOpen(true);
  }, [data, activeSliderId]);

  const getUrl = useCallback((categories: string, index: number, isOpened: boolean) => {
    const category = isOpened ? categories.toLowerCase() : 'secret';

    return `/assets/images/puzzles/${category}/${category}${index}.png`;
  }, []);

  const handleDelete = useCallback(() => {
    if (confirm('퍼즐을 삭제하시겠습니까?')) {
      if (data) {
        deletePuzzle.mutate(data[activeSliderId].id);
      } else {
        alert('퍼즐이 없습니다.');
      }
    }
  }, [activeSliderId, data, deletePuzzle]);

  // queryParam 을 안달고 있는 경우 index 페이지로 랜딩, 초기 랜더링 이후 실행
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

  useEffect(() => setIsUser(Number(userId) === Number(router.query.userId)), [router.query.userId, userId]);

  return (
    <Layout>
      <PuzzleListWrap>
        <Content>
          <div css={title}>{data?.length ? data[0]?.userNickname : nickname || '별명'} 님의 목표</div>
          <SwiperContainer>
            <Swiper
              pagination={true}
              modules={[Pagination]}
              onSlideChange={({ activeIndex }) => setActiveSliderId(activeIndex)}>
              {data && !!data.length ? (
                <>
                  {data.map((puzzle) => (
                    <div key={puzzle.id}>
                      <SwiperSlide key={puzzle.id}>
                        <div css={goal}>
                          {puzzle.title}
                          {isUser && (
                            <div>
                              <DeleteIcon onClick={handleDelete} />
                            </div>
                          )}
                        </div>
                        <PuzzleContainer>
                          <PuzzleWrap>
                            {puzzle?.messages?.length ? (
                              puzzle.messages.map((message) => (
                                <PuzzlePiece
                                  key={message.displayOrder}
                                  alt="puzzle-piece"
                                  src={getUrl(puzzle.category, message.displayOrder, message.isOpened)}
                                  position={puzzlePosition[message.displayOrder]}
                                  onClick={handleClickPiece(message, puzzle.id)}
                                  {...puzzleSize[message.displayOrder]}
                                />
                              ))
                            ) : (
                              <NoMessage>
                                <p>😥</p>
                                <p>도착한 응원의 편지가 없어요.</p>
                                {isUser && (
                                  <>
                                    <p>링크를 공유해</p>
                                    <p>응원의 편지를 요청해보세요!</p>
                                  </>
                                )}
                              </NoMessage>
                            )}
                          </PuzzleWrap>
                        </PuzzleContainer>
                      </SwiperSlide>
                    </div>
                  ))}
                  {isUser && (
                    <SwiperSlide key={'create'}>
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
            {data?.length === 0
              ? '퍼즐을 생성하고 나의 꿈을 펼쳐보아요!'
              : isUser
              ? '친구에게 공유해서 퍼즐조각을 완성해보세요!'
              : '아래 버튼을 클릭해 응원의 메세지를 보내주세요!'}
          </Message>
        </Content>
        {isUser ? (
          <Button
            buttonType={!data?.length ? ButtonType.Disabled : ButtonType.Basic}
            onClick={handleClickShare}
            disabled={!data?.length}>
            공유하기
          </Button>
        ) : (
          <Button
            buttonType={
              !(data?.length && data[activeSliderId].messages.length !== MaxMessage)
                ? ButtonType.Disabled
                : ButtonType.Basic
            }
            onClick={handleClickSendMessage}
            disabled={!(data?.length && data[activeSliderId].messages.length !== MaxMessage)}>
            {!(data?.length && data[activeSliderId].messages.length !== MaxMessage)
              ? '다른 퍼즐에서 DM을 보내주세요!'
              : 'DM 보내기'}
          </Button>
        )}
      </PuzzleListWrap>
      <Letter isOpen={isOpen} onClose={handleClose} data={letterData} isWrite={!isUser} />
    </Layout>
  );
}

export default PuzzleList;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const userId = query.userId as string;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery<Puzzles, ApiError>([PUZZLES_KEY, `${userId}`], () => fetchPuzzles(userId));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
