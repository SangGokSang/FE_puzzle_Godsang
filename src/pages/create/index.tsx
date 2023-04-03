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
import { Category, Pathname } from 'src/core/const/enum';
import { BackIcon } from 'src/core/icons';
import dayjs from 'dayjs';
import { useJoin } from 'src/module/join';
import { isEmpty } from 'lodash';
import { useAddPuzzle } from 'src/module/puzzles/hooks/useAddPuzzle';
import { useRecoilValue } from 'recoil';
import auth from 'src/recoil/auth/atom';

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

// 공백 검증 구현해야함
function Join() {
  const [step, setStep] = useState(1);
  const [disabledButton, setDisabledButton] = useState(true);
  const router = useRouter();
  const { nickname } = useRecoilValue(auth);
  const createForm = useForm<CreateFormType>({
    resolver: yupResolver(
      yup.object().shape({
        nickname: yup
          .string()
          .required('별명을 입력해주세요.')
          .min(1, '한 글자 이상 입력해주세요.')
          .max(7, '일곱 자 이하만 입력 가능합니다.')
          .test('include_space', '별명에 공백을 포함시킬 수 없습니다.', (value) => /[\s]/g.test(value)),
        birth: yup
          .number()
          .typeError('숫자를 입력해주세요.')
          .required('생일을 반드시 입력해주세요.')
          .max(dayjs().valueOf(), '지금보다 미래의 날짜를 입력하실 수 없습니다.'),
        category: yup.string().required('카테고리를 반드시 입력해주세요'),
        goal: yup
          .string()
          .required('목표를 입력해주세요')
          .min(2, '목표를 두 글자 이상 입력해주세요.')
          .max(30, '목표는 삼십 자 이하만 입력 가능합니다.'),
      }),
    ),
    mode: 'all',
    defaultValues: {
      nickname: nickname.slice(0, 7),
      birth: Date.now(),
      category: Category.exercise,
      goal: '',
    },
  });

  const addPuzzle = useAddPuzzle({
    onSuccess: () => router.push(Pathname.list),
    onError: (err) => console.log(err),
  });

  const join = useJoin({
    onSuccess: () => {
      const { category, goal } = createForm.getValues();
      addPuzzle.mutate({ title: goal, category });
    },
    onError: (err) => console.log(err),
  });

  const handleClick = () => {
    if (step < 3) {
      setStep((prev) => ++prev);
    } else {
      const {
        getValues,
        formState: { errors },
      } = createForm;
      if (isEmpty(errors)) {
        const { nickname, birth } = getValues();
        join.mutate({ nickname, birthdate: birth });
      }
    }
  };

  const stepMap: Record<number, ReactElement> = {
    1: <FirstStep />,
    2: <SecondStep />,
    3: <ThirdStep />,
  };

  const handleBackClick = () => {
    if (step !== 1) setStep((prev) => --prev);
  };

  useEffect(() => {
    const { formState, getFieldState, watch } = createForm;
    let flag = true;

    switch (step) {
      case 1:
        const nickname = watch('nickname');
        const { error: nicknameError, isDirty } = getFieldState('nickname', formState);
        const { error: birthError } = getFieldState('birth', formState);
        flag = (nickname.length === 0 && !isDirty) || !!nicknameError || !!birthError;
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
  }, [createForm.formState, createForm.getFieldState, createForm.watch]);

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
