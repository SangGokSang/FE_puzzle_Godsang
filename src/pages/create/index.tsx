import React, { ReactElement, useEffect, useLayoutEffect, useState } from 'react';
import Layout from 'src/components/common/Layout';
import { buttonHoverCss, ButtonSection } from 'src/core/styles/common';
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
import { useJoin } from 'src/module/join';
import { isEmpty } from 'lodash';
import { useAddPuzzle } from 'src/module/puzzles/hooks/useAddPuzzle';
import auth, { authDefaultValue } from 'src/recoil/auth/atom';
import route from 'src/core/const/route.path';
import { scheme } from 'src/core/const/scheme';
import { usePuzzles } from 'src/module/puzzles';
import { useSyncRecoil } from 'src/core/hooks/useSyncRecoil';
import { User } from 'src/recoil/auth/type';
import dayjs from 'dayjs';
import { useSetRecoilState } from 'recoil';

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

function Create() {
  const [step, setStep] = useState(1);
  const router = useRouter();
  const [disabledButton, setDisabledButton] = useState(true);
  const user = useSyncRecoil<User>({ atom: auth, defaultValue: authDefaultValue });
  const setUser = useSetRecoilState(auth);

  const { data = [] } = usePuzzles(`${user.userId ?? 0}`, { enabled: user.userId !== null });

  const createForm = useForm<CreateFormType>({
    resolver: yupResolver(
      yup.object().shape({
        nickname: scheme.nickname,
        birth: scheme.birth,
        category: scheme.category,
        goal: scheme.goal,
      }),
    ),
    mode: 'all',
  });

  const addPuzzle = useAddPuzzle({
    onSuccess: () => router.push({ pathname: route.List, query: { userId: user.userId } }),
    onError: (err) => console.log(err),
  });

  const join = useJoin({
    onSuccess: () => {
      const { category, goal, nickname, birth } = createForm.getValues();
      setUser((prev) => ({ ...prev, nickname, birthdate: birth }));
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
    if (step === 1) {
      if (confirm('퍼즐 생성을 그만두고 퍼즐판 화면으로 돌아가시겠나요?')) {
        router.back();
      }
    } else {
      setStep((prev) => --prev);
    }
  };

  useLayoutEffect(() => {
    const defaultValues = {
      nickname: '',
      birth: dayjs().subtract(1, 'day').valueOf(),
      category: Category.exercise,
      goal: '',
    };

    if (data.length > 0 && user.nickname !== '') {
      setStep(2);
      defaultValues.nickname = user.nickname;
      defaultValues.birth = user.birthdate;
    } else {
      defaultValues.nickname = user.nickname.slice(0, 10);
    }
    createForm.reset(defaultValues);
  }, [user]);

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
        <span className="back-button">
          <BackIcon css={buttonHoverCss} onClick={handleBackClick} />
        </span>
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

export default Create;
