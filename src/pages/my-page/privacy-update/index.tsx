import React, { ChangeEventHandler, useEffect, useState } from 'react';
import { css } from '@emotion/react';
import Button from 'src/components/button';
import { ButtonType } from 'src/components/button/Button';
import Layout from 'src/components/common/Layout';
import styled from '@emotion/styled';
import { TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import dayjs from 'dayjs';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { scheme } from 'src/core/const/scheme';
import { useSetRecoilState } from 'recoil';
import auth from 'src/recoil/auth';
import { useJoin } from 'src/module/join';
import { isEmpty } from 'lodash';
import { useSyncRecoil } from 'src/core/hooks/useSyncRecoil';
import { authDefaultValue } from 'src/recoil/auth/atom';
import { User as RecoilUser } from 'src/recoil/auth/type';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';
import { backButton, buttonHoverCss } from 'src/core/styles/common';
import { BackIcon } from 'src/core/icons';
import { BirthTextField, errorCss, Field } from 'src/components/wizard/puzzle/style';

export type User = {
  nickname: string; // 길이 최소 1글자 최대 7글자 공백 안됨, 특수문자 안됨
  birth: string; // milliseconds
};

export type MyPage = {
  countNextAge: number;
  dDay: number;
  countMeals: number;
  countBooks: number;
  countBodyProfile: number;
};

const layoutCss = css`
  .wrapper {
    width: 100%;
    height: 100%;
    padding-top: 25%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`;
const MyPageSection = styled.section`
  width: 100%;
  padding-top: 15%;
  display: flex;
  flex-direction: column;
  gap: 50px;

  .page-subtitle {
    font-size: 24px;
    margin-bottom: 20px;
  }

  @media screen and (max-width: 768px) {
    gap: 30px;
    padding-top: 20%;
    .page-subtitle {
      font-size: 15px;
      text-align: center;
    }
  }
`;

export const ButtonSection = styled.section`
  width: 100%;
  position: absolute;
  bottom: 0;
`;

const messageCss = css`
  margin-left: 10px;
  font-size: 10px;
  color: red;
`;

const DisableUpdateField = styled.div`
  width: 50%;
  height: 40px;
  display: flex;
  align-items: center;
  border-radius: 6px;

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

function MyPage() {
  const setAuth = useSetRecoilState(auth);
  const [disabledButton, setDisabledButton] = useState(true);
  const { nickname, birthdate, provider, email } = useSyncRecoil<RecoilUser>({
    atom: auth,
    defaultValue: authDefaultValue,
  });
  const router = useRouter();

  const { formState, control, getValues, setValue, setError } = useForm<User>({
    resolver: yupResolver(yup.object().shape({ nickname: scheme.nickname, birth: scheme.birth })),
    mode: 'all',
    defaultValues: {
      nickname: nickname,
      birth: dayjs(birthdate).format('YYYY-MM-DD'),
    },
  });

  const join = useJoin({
    onSuccess: (data) => {
      setAuth((prev) => ({ ...prev, ...data }));
      setError('nickname', {});
      alert('수정 완료!');
    },
    onError: (err) => console.log(err),
  });

  const handleSubmit = () => {
    const { errors } = formState;
    if (isEmpty(errors)) {
      const { nickname, birth } = getValues();
      const birthdate = dayjs(birth).valueOf();
      join.mutate({ nickname, birthdate });
    }
  };

  useEffect(() => {
    const { errors, dirtyFields } = formState;
    setDisabledButton(!isEmpty(errors) || isEmpty(dirtyFields));
  }, [formState]);

  useEffect(() => {
    setValue('nickname', nickname);
    setValue('birth', dayjs(birthdate).format('YYYY-MM-DD'));
  }, [birthdate, nickname, setValue]);

  return (
    <Layout layoutCss={layoutCss} useHeader={false}>
      <BackIcon css={[buttonHoverCss, backButton]} onClick={() => router.back()} />
      <MyPageSection>
        <section className="group">
          <h3 className="page-subtitle">별명과 생년월일을 수정 해주세요!</h3>
          <Field>
            <div className="label">
              별명 {!!formState.errors?.nickname && <span css={errorCss}>{formState.errors.nickname.message}</span>}
            </div>
            <Controller
              name="nickname"
              control={control}
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
            <div className="label">
              생년월일 {!!formState.errors?.birth && <span css={errorCss}>{formState.errors.birth.message}</span>}
            </div>
            <Controller
              control={control}
              name="birth"
              render={({ field: { value, onChange } }) => {
                const handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (event) => {
                  onChange(dayjs(event.currentTarget.value).valueOf());
                };
                const val = dayjs(value).format('YYYY-MM-DD');
                return <BirthTextField type="date" value={val} onChange={handleChange} />;
              }}
            />
          </Field>
        </section>
        <section>
          <h3 className="page-subtitle">
            아래 필드는 수정이&nbsp;
            <span
              css={css`
                color: red;
              `}>
              불가능
            </span>
            &nbsp;합니다!
          </h3>
          <Field>
            <div className="label">
              로그인 출처
              <span css={messageCss}>수정이 불가능합니다!</span>
            </div>
            <DisableUpdateField>- {provider}</DisableUpdateField>
          </Field>
          <Field>
            <div className="label">
              이메일
              <span css={messageCss}>수정이 불가능합니다!</span>
            </div>
            <DisableUpdateField>- {email}</DisableUpdateField>
          </Field>
        </section>
      </MyPageSection>
      <ButtonSection>
        <Button
          buttonType={disabledButton ? ButtonType.Disabled : ButtonType.Basic}
          disabled={disabledButton}
          onClick={handleSubmit}>
          수정하기
        </Button>
      </ButtonSection>
    </Layout>
  );
}

export async function getServerSideProps(context: any) {
  const session = await getSession(context);
  if (session === null) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  return { props: {} };
}

export default MyPage;
