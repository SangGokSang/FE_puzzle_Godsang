import React from 'react';
import styled from '@emotion/styled';
import { cx } from '@emotion/css';
import { css } from '@emotion/react';
import { AppBar, Avatar, Chip } from '@mui/material';
import { useRecoilValue } from 'recoil';
import isMobile from 'src/core/recoil/isMobile';

const Wrapper = styled.header`
  width: 100%;
  height: 60px;
  background-color: inherit;
  margin-top: 15px;

  & .user__interface {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    font-size: 14px;
  }

  @media screen and (max-width: 768px) {
    width: 90%;
    margin: 0 auto;
  }
`;

const roundQuadrangleCss = css`
  width: 100%;
  height: 100%;
  padding: 0 10px;
  background-color: rgba(234, 224, 218, 0.6);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media screen and (min-width: 768px) {
    width: 60%;
    margin: 0 auto;
  }
`;

export default function Header() {
  const isMobileSize = useRecoilValue(isMobile);

  console.log('isMobile(Recoil)', isMobileSize);
  return (
    <Wrapper>
      <div css={roundQuadrangleCss}>
        <div className={cx('user__interface')}>
          <Avatar src="/assets/icons/icon-clock.png" alt="user_img" />
          <span css={css``}>{'무엇이똑같을까'}</span>
        </div>
        <Chip label="D-766" />
      </div>
    </Wrapper>
  );
}
