import React, { useState } from 'react';
import Layout from 'src/components/common/Layout';
import { ButtonSection } from 'src/common/styles/common';
import Button from 'src/components/button';
import { ButtonType } from 'src/components/button/Button';
import { useForm } from 'react-hook-form';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Step } from 'src/common/const/enum';
import JoinFirstStep from 'src/components/wizard/join/step1';
import JoinSecondStep from 'src/components/wizard/join/step2';

type UserInfo = {
  birth: string;
  nickname: string;
};

const step = [Step.first, Step.second];

const StepSection = styled.section<{ step: Step }>`
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
      width: 45px;
      height: 6px;
      border-radius: 50px;
      background-color: #9148da;
      position: absolute;
      left: ${(props) => (props.step === Step.first ? 0 : 'unset')};
      right: ${(props) => (props.step === Step.second ? 0 : 'unset')};
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
  const [step, setStep] = useState(Step.second);
  const form = useForm<UserInfo>({
    defaultValues: {
      birth: '',
      nickname: '',
    },
  });
  return (
    <Layout useHeader={false}>
      <StepSection step={step}>
        <div className="progress">
          <span className="step" />
        </div>
      </StepSection>
      <WizardSection>
        <Breadcrumb>STEP {step === Step.first ? 1 : 2}/2</Breadcrumb>
        {step === Step.first ? <JoinFirstStep /> : <JoinSecondStep />}
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
