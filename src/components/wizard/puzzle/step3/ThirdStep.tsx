import React, { useMemo } from 'react';
import { css } from '@emotion/react';
import { TextField } from '@mui/material';
import dayjs from 'dayjs';
import { Controller, useFormContext } from 'react-hook-form';
import { Category } from 'src/core/const/enum';
import { getDDay } from 'src/core/util/util';
import { CreateFormType } from 'src/pages/create';
import { annotateCss, Container, Description, errorCss, Field, notiCss } from '../style';

const categoryMap: Record<string, string> = {
  [Category.exercise]: '운동',
  [Category.travel]: '여행',
  [Category.career]: '커리어',
  [Category.moneyManagement]: '재태크',
  [Category.quittingSmoking]: '금연',
  [Category.love]: '연애',
  [Category.etc]: '기타',
};

const preCss = css`
  white-space: pre-wrap;
`;

function ThirdStep() {
  const {
    watch,
    control,
    formState: { errors },
  } = useFormContext<CreateFormType>();
  const { nickname, category, birth } = watch();
  const anno = useMemo(() => {
    const d_day = getDDay(dayjs(birth));
    return `2023년, 6월부터 만 나이가 적용되면서 
우리에게 ${d_day}일의 시간이 선물처럼 다가왔어요.
선물로 다가온 소중한 ${d_day}일 동안 ${nickname} 님이 이뤄낼,
목표를 한 줄로 적고 친구, 지인에게 공유해보세요!
`;
  }, [nickname, birth]);

  return (
    <Container>
      <Description>
        {categoryMap[category]} 목표
        {!!errors?.goal && <span css={errorCss}>{errors?.goal?.message}</span>}
      </Description>
      <pre css={[annotateCss, preCss]}>{anno}</pre>
      <Field>
        <Controller
          name="goal"
          control={control}
          render={({ field: { value, onChange } }) => (
            <TextField
              value={value}
              onChange={onChange}
              inputProps={{ maxLength: 30 }}
              sx={{ height: '170px' }}
              placeholder="목표를 입력해주세요!"
              multiline={false}
            />
          )}
        />
      </Field>
      <p css={notiCss}>카테고리와 목표는 퍼즐 생성 시 수정하실 수 없습니다!</p>
    </Container>
  );
}

export default ThirdStep;
