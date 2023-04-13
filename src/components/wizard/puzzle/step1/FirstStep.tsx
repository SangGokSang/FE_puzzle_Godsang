import React, { ChangeEventHandler, useMemo } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import dayjs from 'dayjs';
import { TextField } from '@mui/material';
import { CreateFormType } from 'src/pages/create';
import { getDDay } from 'src/core/util/util';
import { Container, Description, errorCss, Field } from '../style';

function FirstStep() {
  const {
    control,
    watch,
    formState: { errors },
  } = useFormContext<CreateFormType>();
  const { nickname, birth } = watch();

  const description = useMemo(() => {
    const d_day = isNaN(birth) ? '0' : getDDay(dayjs(birth));
    const birthday = isNaN(birth) ? 'YYYY-MM-DD' : dayjs(birth).format('YYYY년 MM월 DD일');
    return `저의 별명은 ${nickname} 이며, 
${birthday} 생이고
지금의 나이로 돌아가기까지
D-${d_day} 일 남았어요”`;
  }, [nickname, birth]);

  return (
    <Container>
      <Description>{description}</Description>
      <Field>
        <div className="label">별명 {!!errors?.nickname && <span css={errorCss}>{errors.nickname.message}</span>}</div>
        <Controller
          name="nickname"
          control={control}
          render={({ field: { value, onChange } }) => (
            <TextField
              value={value}
              onChange={onChange}
              inputProps={{ maxLength: 7 }}
              placeholder="별명을 입력해주세요!"
            />
          )}
        />
      </Field>
      <Field>
        <div className="label">생년월일 {!!errors?.birth && <span css={errorCss}>{errors.birth.message}</span>}</div>
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
                InputProps={{ inputProps: { style: { textAlign: 'left' } } }}
              />
            );
          }}
        />
      </Field>
    </Container>
  );
}

export default FirstStep;
