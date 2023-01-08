import React, { useState } from 'react';
import styled from '@emotion/styled';
import Card from 'src/components/Card';
import { getContentWithEllipsis } from 'src/common/util/util';
import { IconButton } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { css } from '@emotion/react';
import { cloneDeep } from 'lodash';
import ContentRow from 'src/components/ContentRow/ContentRow';

type Goal = {
  id: number;
  content: string;
};

const goalList: Goal[] = [
  { id: 1, content: '올해 안에 금연 도져언!!' },
  { id: 2, content: '올해 10kg 빼고 바프 가즈아' },
  { id: 3, content: '하루 1커밋 운동 가즈아' },
  { id: 4, content: '' },
  { id: 5, content: '' },
  { id: 6, content: '' },
  { id: 7, content: '' },
  { id: 8, content: '' },
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

const sampleCardCss = css`
  border: 1px gray dotted;
  background-color: white;
  opacity: 0.6;
`;

interface IExpanded {
  [key: string]: boolean;
}

function Main() {
  const [isExpand, setIsExpand] = useState<IExpanded>({
    sample: true,
    all: true,
  });
  const handleClickIcon = (name: string) => () => {
    setIsExpand((prev) => {
      const newExpanded = cloneDeep(prev);
      newExpanded[name] = !prev[name];
      return newExpanded;
    });
  };

  return (
    <PageWrapper>
      <ContentRow
        name="sample"
        title="편지가 도착한 나의 목표"
        onIconClick={handleClickIcon}
        isExpand={isExpand.sample}>
        <Card cardCss={sampleCardCss}>샘플이에요! 클릭 해보세요!</Card>
      </ContentRow>
      <ContentRow name="all" title="나의 모든 목표들" onIconClick={handleClickIcon} isExpand={isExpand.all}>
        {goalList.map(({ content, id }) => (
          <Card key={id}>
            {!content.length ? (
              <IconButton>
                <AddCircleOutlineIcon />
              </IconButton>
            ) : (
              getContentWithEllipsis(content)
            )}
          </Card>
        ))}
      </ContentRow>
    </PageWrapper>
  );
}

export default Main;
