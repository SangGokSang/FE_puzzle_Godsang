import React, { ChangeEventHandler, useEffect, useMemo, useRef } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import dayjs, { Dayjs } from 'dayjs';
import { TextField } from '@mui/material';
import { CreateFormType } from 'src/pages/create';
import { getDDay } from 'src/core/util/util';
import { Container, Description, Field } from '../style';
import { DateField } from '@mui/x-date-pickers';

function FirstStep() {
  const { control, watch } = useFormContext<CreateFormType>();
  const { nickname, birth } = watch();

  const description = useMemo(() => {
    const d_day = getDDay(dayjs(birth));
    return `저의 별명은 ${nickname} 이며, 
${dayjs(birth).format('YYYY년 MM월 DD일')} 생이고
지금의 나이로 돌아가기까지
D-${d_day} 일 남았어요”`;
  }, [nickname, birth]);

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
            const handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (event) => {
              onChange(dayjs(event.currentTarget.value).valueOf());
            };
            const val = dayjs(value).format('YYYY-MM-DD');
            return (
              <TextField
                type="date"
                value={val}
                onChange={handleChange}
                inputProps={{ style: { textAlign: 'left' } }}
              />
            );
          }}
        />
      </Field>
    </Container>
  );
}

export default FirstStep;
