import React, { ReactElement, useCallback, useMemo, useState } from 'react';
import Layout from 'src/components/common/Layout';
import { ButtonSection } from 'src/common/styles/common';
import Button from 'src/components/button';
import { ButtonType } from 'src/components/button/Button';
import { FormProvider, useForm } from 'react-hook-form';
import FirstStep from 'src/components/wizard/puzzle/step1/FirstStep';
import SecondStep from 'src/components/wizard/puzzle/step2/SecondStep';
import ThirdStep from 'src/components/wizard/puzzle/step3/ThirdStep';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Category } from 'src/common/const/enum';
import { useRouter } from 'next/router';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

export type CreateFormType = {
  nickname: string;
  birth: number; //timestamp
  category: Category;
  goal: string;
};

const StepSection = styled.section<{ step: number }>`
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

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

  .back-button {
    position: absolute;
    cursor: pointer;
    left: 0;
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

const schema = yup.object().shape({
  nickname: yup
    .string()
    .required('반드시 입력해주세요.')
    .min(2, '두 글자 이상 입력해주세요.')
    .max(10, '열 자 이하만 입력 가능합니다.'),
  birth: yup.number().required('반드시 입력해주세요.'),
  category: yup.string().required('반드시 입력해주세요'),
  goal: yup
    .string()
    .required('반드시 입력해주세요')
    .min(2, '두 글자 이상 입력해주세요.')
    .max(30, '삼십 자 이하만 입력 가능합니다.'),
});

const stepMap: Record<number, ReactElement> = {
  1: <FirstStep />,
  2: <SecondStep />,
  3: <ThirdStep />,
};

function Join() {
  const [step, setStep] = useState(1);
  const router = useRouter();
  const createForm = useForm<CreateFormType>({
    mode: 'all',
    defaultValues: {
      birth: Date.now(),
      nickname: '',
      category: Category.exercise,
      goal: '',
    },
    resolver: yupResolver(schema),
  });

  const disabledButton = useMemo(() => {
    const { formState, getFieldState } = createForm;
    let flag = true;

    switch (step) {
      case 1:
        const { error: nicknameError } = getFieldState('nickname', formState);
        const { error: birthError } = getFieldState('birth', formState);
        flag = !!nicknameError || !!birthError;
        break;
      case 2:
        const { error: categoryError } = getFieldState('category', formState);
        flag = !!categoryError;
        break;
      case 3:
        const { error: goalError } = getFieldState('goal', formState);
        flag = !!goalError;
        break;
    }
    return flag;
  }, [createForm.formState]);

  const handleClick = useCallback(() => {
    if (step < 3) {
      setStep((prev) => ++prev);
    } else {
      // mutate
      const { getValues } = createForm;
      console.log(getValues());
      router.push('list');
    }
  }, [step, createForm]);

  const handleBackClick = useCallback(() => {
    if (step !== 1) setStep((prev) => --prev);
  }, [step]);

  return (
    <Layout useHeader={false}>
      <StepSection step={step}>
        {step !== 1 && (
          <span className="back-button">
            <img src="/assets/icons/icon-back-button.png" alt="뒤로가기버튼" onClick={handleBackClick} />
          </span>
        )}
        <div className="progress">
          <span className="step" />
        </div>
      </StepSection>
      <WizardSection>
        <Breadcrumb>STEP {step}/3</Breadcrumb>
        <FormProvider {...createForm}>{stepMap[step]}</FormProvider>
      </WizardSection>
      <ButtonSection css={buttonSectionCss}>
        <Button
          buttonType={disabledButton ? ButtonType.Disabled : ButtonType.Basic}
          onClick={handleClick}
          disabled={disabledButton}>
          {step === 3 ? '완성하기' : '다음'}
        </Button>
      </ButtonSection>
    </Layout>
  );
}

export default Join;
