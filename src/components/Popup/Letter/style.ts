import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const MessageCard = styled.div`
  margin: 100px auto;
  width: 280px;
  height: 280px;
  background-color: #f0edf2;
  border: 1px solid #000000;
  border-radius: 6px;
  /* position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); */
  .sender {
    display: flex;
    gap: 10px;
    /* align-items: center; */
    /* position: absolute;
    bottom: 0px;
    right: 0px; */
    color: #000000;
    font-weight: 400;
    font-size: 13px;
    line-height: 20px;
  }
`;

export const RecipientField = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 18px;
  color: #000000;
  font-weight: 400;
  font-size: 13px;
  line-height: 20px;
`;

export const TextBodyField = styled.div`
  margin: 18px;
  width: 100%;
  display: flex;
`;

export const SenderField = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  position: absolute;
  bottom: 0px;
  right: 0px;
  color: #000000;
  font-weight: 400;
  font-size: 13px;
  line-height: 20px;
`;

export const SwiperContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
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
    gap: 13px;
    left: 348px !important;
    bottom: 328px !important;

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
