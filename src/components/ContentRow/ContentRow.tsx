import React, { ReactNode } from 'react';
import styled from '@emotion/styled';
import { cx } from '@emotion/css';
import { IconButton } from '@mui/material';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Container = styled.section`
  width: 100%;
  height: auto;
  .row__interface {
    width: 100%;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 5px;
    padding-left: 10px;
    margin: 3px 0;
  }

  .row__title {
    display: inline-block;
    font-weight: 600;
    font-size: 15px;
    line-height: 22px;
  }

  .row__contents {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
`;

type ContentRowProps = {
  name: string;
  title: string;
  children: ReactNode;
  isExpand: boolean;
  onIconClick: (name: string) => () => void;
};

// title과 접기버튼
// 접으면 title, 펼치기 버튼만 보이도록!

function ContentRow({ name, title, children, isExpand, onIconClick }: ContentRowProps) {
  return (
    <Container>
      <div className={cx('row__interface')}>
        <h3 className={cx('row__title')}>{title}</h3>
        <IconButton onClick={onIconClick(name)}>{isExpand ? <ExpandLessIcon /> : <ExpandMoreIcon />}</IconButton>
      </div>
      <div className={cx('row__contents')}>{children}</div>
    </Container>
  );
}

export default React.memo(ContentRow);
