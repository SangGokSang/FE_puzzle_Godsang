import React, { useCallback } from 'react';
import Button from 'src/components/button';
import { ButtonType } from 'src/components/button/Button';
import Layout from 'src/components/common/Layout';
import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Content, Goal, Message, PuzzleListWrap, PuzzleWrap, SwiperContainer } from './style';
import 'swiper/css';
import 'swiper/css/pagination';

function PuzzleList() {
  const handleClickBtn = useCallback(() => console.log('click'), []);
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
                <PuzzleWrap>puzzle</PuzzleWrap>
              </SwiperSlide>
              <SwiperSlide>
                <PuzzleWrap>puzzle</PuzzleWrap>
              </SwiperSlide>
            </Swiper>
          </SwiperContainer>
          <Message>친구에게 공유해서 퍼즐조각을 완성해보세요!</Message>
        </Content>
        <Button buttonType={ButtonType.Basic} onClick={handleClickBtn}>
          공유하기
        </Button>
      </PuzzleListWrap>
    </Layout>
  );
}

export default PuzzleList;
