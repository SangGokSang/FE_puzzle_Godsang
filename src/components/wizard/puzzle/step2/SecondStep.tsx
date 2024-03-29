import React, { useCallback, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import { Category } from 'src/core/const/enum';
import { CreateFormType } from 'src/pages/create';
import { annotateCss, Container, Description } from '../style';
import { Badge, CategorySection } from './style';

type BadgeType = {
  key: Category;
  label: string;
};

const categories: BadgeType[] = [
  { label: '운동', key: Category.exercise },
  { label: '여행', key: Category.travel },
  { label: '커리어', key: Category.career },
  { label: '재태크', key: Category.moneyManagement },
  { label: '금연', key: Category.quittingSmoking },
  { label: '연애', key: Category.love },
  { label: '기타', key: Category.etc },
];

function SecondStep() {
  const { watch, setValue } = useFormContext<CreateFormType>();
  const { nickname, category } = watch();

  const description = useMemo(
    () => `${nickname} 님의
올해 목표를 선택해주세요.`,
    [nickname],
  );

  const handleClickBadge = useCallback(
    (category: Category) => () => {
      setValue('category', category);
    },
    [setValue],
  );
  return (
    <Container>
      <Description>{description}</Description>
      <p css={annotateCss}>친구들의 메세지가 모여지면 설정한 목표의 퍼즐그림이 완성됩니다.</p>
      <CategorySection>
        {categories.map(({ key, label }) => (
          <Badge key={key} onClick={handleClickBadge(key)} isPressed={category === key}>
            {label}
          </Badge>
        ))}
      </CategorySection>
    </Container>
  );
}

export default SecondStep;
