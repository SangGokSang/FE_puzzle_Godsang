import React from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useFormContext } from 'react-hook-form';
import { UserInfo } from 'src/module/join';

type FirstStepProps = {
  isDisableButton: () => boolean;
};

const Description = styled.p`
  width: 80%;
  margin: 0;
  margin-top: 26px;
  color: #000000;
  font-weight: 400;
  font-size: 22px;
  line-height: 33px;
`;

const step1Des = `
  여러분의 생년월일을 알려주세요!
  알려주신 생년월일은 
  DM의 퍼즐을 만드는데 있어서,
  소중한 한 조각이 됩니다.
`;

function JoinFirstStep() {
  const method = useFormContext<UserInfo>();
  return (
    <div
      css={css`
        width: 100%;
        height: calc(100% - 20px);
      `}>
      <Description>{step1Des}</Description>
    </div>
  );
}

export default JoinFirstStep;
