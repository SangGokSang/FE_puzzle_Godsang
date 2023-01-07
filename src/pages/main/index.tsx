import React from 'react';
import styled from '@emotion/styled';
import Card from 'src/components/Card';
import { getContentWithEllipsis } from 'src/common/util/util';
import { IconButton } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { css } from '@emotion/react';

type Goal = {
  id: number;
  content: string;
  isEmpty?: boolean;
};

const goalList: Goal[] = [
  { id: 1, content: '올해 안에 금연 도져언!!' },
  { id: 2, content: '올해 10kg 빼고 바프 가즈아' },
  { id: 3, content: '하루 1커밋 운동 가즈아' },
  { id: 4, content: '올해는 한달에 책 한 권씩 꼭 읽고싶다!' },
  { id: 5, content: '', isEmpty: true },
];

const PageWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 15px;
  display: flex;
  flex-direction: column;
  gap: 15px;

  @media screen and (max-width: 768px) {
    padding-top: 35px;
    gap: 20px;
  }
`;

function Main() {
  return (
    <PageWrapper>
      <Card
        cardCss={css`
          border: 1px gray dotted;
          background-color: white;
          opacity: 0.6;
        `}>
        샘플이에요! 클릭 해보세요!
      </Card>
      {goalList.map(({ content, id, isEmpty = false }) => (
        <Card key={id}>
          {isEmpty ? (
            <IconButton>
              <AddCircleOutlineIcon />
            </IconButton>
          ) : (
            getContentWithEllipsis(content)
          )}
        </Card>
      ))}
    </PageWrapper>
  );
}

export default Main;
