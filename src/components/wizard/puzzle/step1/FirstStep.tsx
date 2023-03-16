import React, { useEffect, useMemo } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import dayjs, { Dayjs } from 'dayjs';
import { TextField } from '@mui/material';
import { CreateFormType } from 'src/pages/create';
import { getDDay } from 'src/common/util/util';
import { Container, Description, Field } from '../style';
import { DatePicker } from './style';

function FirstStep() {
  const { control, watch, trigger } = useFormContext<CreateFormType>();
  const { nickname, birth } = watch();

  const description = useMemo(() => {
    const d_day = getDDay(dayjs(birth));
    return `“저의 별명은 ${nickname} 이며, 
${dayjs(birth).format('YYYY년 MM월 DD일')} 생이고
지금의 나이로 돌아가기
D-${d_day} 일 남았어요”`;
  }, [nickname, birth]);

  useEffect(() => {
    trigger('nickname');
  }, []);

  return (
    <Container>
      <Description>{description}</Description>
      <Field>
        <div className="label">별명</div>
        <Controller
          name="nickname"
          control={control}
          render={({ field: { value, onChange } }) => (
            <TextField
              value={value}
              onChange={onChange}
              inputProps={{ maxLength: 10 }}
              placeholder="별명을 입력해주세요!"
            />
          )}
        />
      </Field>
      <Field>
        <div className="label">생년월일</div>
        <Controller
          control={control}
          name="birth"
          render={({ field: { value, onChange } }) => {
            const handleChange = (value: unknown) => {
              onChange((value as Dayjs).valueOf());
            };
            return <DatePicker value={dayjs(value)} onChange={handleChange} minDate={dayjs().subtract(100, 'year')} />;
          }}
        />
      </Field>
    </Container>
  );
}

export default FirstStep;
