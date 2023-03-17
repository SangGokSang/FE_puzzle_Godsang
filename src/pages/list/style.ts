import styled from '@emotion/styled';
import { Swiper as SwiperReact } from 'swiper/react';

export const PuzzleListWrap = styled.div`
  height: 100%;
`;

export const Content = styled.div`
  width: 100%;
  height: calc(100% - 60px);
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Goal = styled.div`
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

export const SwiperContainer = styled.div`
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

export const PuzzleWrap = styled.div`
  width: 280px;
  height: 280px;
  border-radius: 6px;
  background-color: #f3f3f3;
`;

export const Message = styled.div`
  font-size: 13px;
  font-weight: 400;
  line-height: 20px;
  margin: 20px 0 15px;
`;
