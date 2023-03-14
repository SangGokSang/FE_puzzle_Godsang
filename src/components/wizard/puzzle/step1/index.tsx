import React from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Controller, useFormContext } from 'react-hook-form';
import { UserInfo } from 'src/module/join';
import dayjs from 'dayjs';
import { DatePicker as MUIDatePikcer } from '@mui/x-date-pickers';
import { TextField } from '@mui/material';

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

const val = `“저는,
1994년, 10월, 25일 생이고
만 나이로 돌아가기
D-day 3948일 남았어요.”`;

function FirstStep() {
  const { control } = useFormContext<UserInfo>();
  return (
    <div
      css={css`
        width: 100%;
        height: calc(100% - 20px);
      `}>
      <Description>{val}</Description>
      <Field>
        <div className="label">생년월일</div>
        <Controller
          control={control}
          name="birth"
          render={({ field: { value, onChange } }) => <DatePicker value={value} onChange={onChange} />}
        />
      </Field>
      <Field>
        <div className="label">별명</div>
        <Controller control={control} name="birth" render={({ field: { value, onChange } }) => <TextField />} />
      </Field>
    </div>
  );
}

export default FirstStep;
