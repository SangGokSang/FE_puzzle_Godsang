import React, { ReactElement, useState } from 'react';
import Layout from 'src/components/common/Layout';
import { ButtonSection } from 'src/common/styles/common';
import Button from 'src/components/button';
import { ButtonType } from 'src/components/button/Button';
import { FormProvider, useForm } from 'react-hook-form';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Step } from 'src/common/const/enum';
import FirstStep from 'src/components/wizard/puzzle/step1';
import SecondStep from 'src/components/wizard/puzzle/step2';
import { UserInfo } from 'src/module/join';
import ThirdStep from 'src/components/wizard/puzzle/step3';
import dayjs, { Dayjs } from 'dayjs';

const step = [Step.first, Step.second, Step.third];

export type FormType = {
  nickname: string;
  birth: Dayjs;
};

const StepSection = styled.section<{ step: number }>`
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;

  .progress {
    width: 90px;
    height: 6px;
    border-radius: 50px;
    background-color: #f3f3f3;
    position: relative;

    .step {
      width: 30px;
      height: 6px;
      border-radius: 50px;
      position: absolute;
      left: ${({ step }) => (step === 1 ? 0 : step === 2 ? '30px' : '60px')};
      background-color: #9148da;
    }
  }
`;

const WizardSection = styled.section`
  width: 100%;
  height: calc(100% - 120px);
  padding-top: 30px;
`;

const Breadcrumb = styled.p`
  width: 100%;
  height: 20px;
  margin: 0;
  color: #9148da;
  font-weight: 500;
  font-size: 13px;
`;

const buttonSectionCss = css`
  position: absolute;
  bottom: 0;
`;

function Join() {
  const [step, setStep] = useState(1);
  const form = useForm<FormType>({
    defaultValues: {
      birth: dayjs(),
      nickname: '',
    },
  });

  const stepMap: { [idx: number]: ReactElement } = {
    1: <FirstStep />,
    2: <SecondStep />,
    3: <ThirdStep />,
  };

  return (
    <Layout useHeader={false}>
      <StepSection step={step}>
        <div className="progress">
          <span className="step" />
        </div>
      </StepSection>
      <WizardSection>
        <Breadcrumb>STEP {step}/3</Breadcrumb>
        <FormProvider {...form}>{stepMap[step]}</FormProvider>
      </WizardSection>
      <ButtonSection css={buttonSectionCss}>
        <Button buttonType={ButtonType.Basic} onClick={() => {}}>
          다음
        </Button>
      </ButtonSection>
    </Layout>
  );
}

export default Join;
