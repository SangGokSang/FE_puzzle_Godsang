import React, { ReactElement, useEffect, useState } from 'react';
import Layout from 'src/components/common/Layout';
import { ButtonSection } from 'src/core/styles/common';
import Button from 'src/components/button';
import { ButtonType } from 'src/components/button/Button';
import { FormProvider, useForm } from 'react-hook-form';
import FirstStep from 'src/components/wizard/puzzle/step1/FirstStep';
import SecondStep from 'src/components/wizard/puzzle/step2/SecondStep';
import ThirdStep from 'src/components/wizard/puzzle/step3/ThirdStep';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { Category } from 'src/core/const/enum';
import { BackIcon } from 'src/core/icons';

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
  const [disabledButton, setDisabledButton] = useState(true);
  const router = useRouter();
  const createForm = useForm<CreateFormType>({
    resolver: yupResolver(schema),
    mode: 'all',
    defaultValues: {
      nickname: '',
      birth: Date.now(),
      category: Category.exercise,
      goal: '',
    },
  });

  const handleClick = () => {
    if (step < 3) {
      setStep((prev) => ++prev);
    } else {
      // mutate
      const { getValues } = createForm;
      console.log(getValues());
      router.push('list');
    }
  };

  const handleBackClick = () => {
    if (step !== 1) setStep((prev) => --prev);
  };

  useEffect(() => {
    const { formState, getFieldState } = createForm;
    let flag = true;

    switch (step) {
      case 1:
        const { isDirty: isNicknameDirty, error: nicknameError } = getFieldState('nickname', formState);
        const { error: birthError } = getFieldState('birth', formState);
        flag = !isNicknameDirty || !!nicknameError || !!birthError;
        break;
      case 2:
        const { error: categoryError } = getFieldState('category', formState);
        flag = !!categoryError;
        break;
      case 3:
        const { isDirty: isGoalDirty, error: goalError } = getFieldState('goal', formState);
        flag = !isGoalDirty || !!goalError;
        break;
    }
    setDisabledButton(flag);
  }, [createForm.formState, createForm.getFieldState]);

  return (
    <Layout useHeader={false}>
      <StepSection step={step}>
        {step !== 1 && (
          <span className="back-button">
            <BackIcon onClick={handleBackClick} />
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
      <ButtonSection>
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
