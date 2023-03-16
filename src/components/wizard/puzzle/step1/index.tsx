import React, { useMemo } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Controller, useFormContext } from 'react-hook-form';
import { UserInfo } from 'src/module/join';
import dayjs, { Dayjs } from 'dayjs';
import { DatePicker as MUIDatePikcer } from '@mui/x-date-pickers';
import { TextField } from '@mui/material';
import { FormType } from 'src/pages/create';

type StepProps = {
  isDisableButton: () => boolean;
};

const Description = styled.pre`
  margin: 0;
  margin-top: 26px;
  color: #000000;
  font-weight: 400;
  font-size: 20px;
  line-height: 33px;
  white-space: pre-wrap;
`;

const Field = styled.div`
  width: 100%;
  margin-top: 12px;
  & .label {
    font-weight: 500;
    font-size: 13px;
    line-height: 20px;
  }
`;

const DatePicker = styled(MUIDatePikcer)`
  background: #f3f3f3;
  border-radius: 6px;
  width: 320px;
  height: 60px;
  & .MuiInputBase-root {
    height: 100%;
  }
`;

function getDDay(birth: Dayjs): number {
  const diff = dayjs().year() - birth.year();
  const d_day = birth.add(diff + 1, 'year');
  return d_day.diff(dayjs(), 'day');
}

function FirstStep() {
  const { control, watch } = useFormContext<FormType>();
  const { nickname, birth } = watch();

  const val = useMemo(() => {
    const d_day = getDDay(birth);
    return `“저의 별명은 ${nickname} 이며, 
${birth.format('YYYY년 MM월 DD일')} 생이고
현재 나이로 돌아가기
D-${d_day} 일 남았어요”`;
  }, [nickname, birth]);

  return (
    <div
      css={css`
        width: 100%;
        height: calc(100% - 20px);
      `}>
      <Description>{val}</Description>
      <Field>
        <div className="label">별명</div>
        <Controller
          name="nickname"
          control={control}
          rules={{
            required: true,
            minLength: { value: 2, message: '2글자 이상 입력해주세요' },
            maxLength: { value: 10, message: '10글자 이하만 입력 가능합니다' },
          }}
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
          render={({ field: { value, onChange } }) => (
            <DatePicker value={value} onChange={onChange} minDate={dayjs().subtract(100, 'year')} />
          )}
        />
      </Field>
    </div>
  );
}

export default FirstStep;
