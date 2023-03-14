import React, { useMemo } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Controller, useFormContext } from 'react-hook-form';
import { UserInfo } from 'src/module/join';
import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers';
import { TextField } from '@mui/material';
import { convertToObject } from 'typescript';
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

function FirstStep() {
  const { control, watch } = useFormContext<FormType>();
  const { nickname, birth } = watch();
  // console.log(birth.diff(dayjs(), 'day'));

  const val = useMemo(
    () => `“저는, 
${birth.format('YYYY년 MM월 DD일')} 생이고
만 나이로 돌아가기
D-day 3948일 남았어요.”`,
    [],
  );
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
          control={control}
          name="nickname"
          render={({ field: { value, onChange } }) => (
            <TextField value={value} onChange={onChange} placeholder="별명을 입력해주세요!" />
          )}
        />
      </Field>
      <Field>
        <div className="label">생년월일</div>
        <Controller
          control={control}
          name="birth"
          render={({ field: { value, onChange } }) => <DatePicker value={value} onChange={onChange} />}
        />
      </Field>
    </div>
  );
}

export default FirstStep;
