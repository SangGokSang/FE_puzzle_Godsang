import React, { useEffect, useMemo } from 'react';
import { css } from '@emotion/react';
import { TextField } from '@mui/material';
import dayjs from 'dayjs';
import { Controller, useFormContext } from 'react-hook-form';
import { Category } from 'src/common/const/enum';
import { getDDay } from 'src/common/util/util';
import { CreateFormType } from 'src/pages/create';
import { annotateCss, Container, Description, Field } from '../style';

const categoryMap: Record<string, string> = {
  [Category.exercise]: '운동',
  [Category.travel]: '여행',
  [Category.career]: '커리어',
  [Category.moneyManagement]: '재태크',
  [Category.etc]: '기타',
};

export const preCss = css`
  white-space: pre-wrap;
`;

function ThirdStep() {
  const { watch, control, trigger } = useFormContext<CreateFormType>();
  const { nickname, category, birth } = watch();
  const anno = useMemo(() => {
    const d_day = getDDay(dayjs(birth));
    return `2023년, 6월부터 만 나이가 적용되면서 
저희에게 ${d_day}일의 시간이 선물처럼 왔어요.
만 나이로 돌아가기 전,
${nickname}님의 선택한 (${categoryMap[category]})의 목표를 적고
친구, 지인에게 공유해보세요.
`;
  }, [nickname, category, birth]);

  useEffect(() => {
    trigger('goal');
  }, []);

  return (
    <Container>
      <Description>목표</Description>
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
              multiline={true}
              maxRows={5}
            />
          )}
        />
      </Field>
    </Container>
  );
}

export default ThirdStep;
