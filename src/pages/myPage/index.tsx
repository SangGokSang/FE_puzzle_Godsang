import React, { ChangeEventHandler, useEffect, useMemo, useState } from 'react';
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
import { getDDay } from 'src/core/util/util';
import { scheme } from 'src/core/const/scheme';
import { errorCss } from 'src/components/wizard/puzzle/style';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import auth from 'src/recoil/auth';
import { useJoin } from 'src/module/join';
import { isEmpty } from 'lodash';

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
  height: calc(100% - 50px);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StoryLine = styled.div`
  width: 500px;
  height: 400px;
  font-weight: 400;
  font-size: 20px;
  line-height: 26px;
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const NameBirthDay = styled.div`
  display: flex;
  align-items: center;
`;

const InputField = styled.div`
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  .label {
    padding-left: 40px;
  }
`;

const LabelInputWrap = styled.div`
  display: flex;
  align-items: center;
`;

const NicknameTextField = styled(TextField)`
  width: 200px;
  height: 28px;
  position: relative;

  .MuiInputBase-input {
    padding: 3px;
  }
  .MuiInputBase-input.Mui-disabled {
    -webkit-text-fill-color: #000000;
    font-family: 'GmarketSans';
    font-size: 20px;
    padding: 0;
    padding-left: 10px;
  }
`;

const BirthDayTextField = styled(TextField)`
  width: 200px;
  height: 28px;
  padding: 0;

  .MuiInputBase-input {
    padding: 3px;
  }
  .MuiInputBase-input.Mui-disabled {
    -webkit-text-fill-color: #000000;
    font-family: 'GmarketSans';
    font-size: 20px;
    padding: 0;
    padding-left: 10px;
  }
`;

const Text = styled.div<{ isEdit: boolean }>`
  margin-right: ${({ isEdit }) => (isEdit ? '10px' : null)};
`;

const Story = styled.div`
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const ButtonSection = styled.section`
  width: 100%;
  height: 85px;
  position: absolute;
  bottom: 0;
`;

function MyPage() {
  const { nickname, birthdate } = useRecoilValue(auth);
  const setAuth = useSetRecoilState(auth);

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  const {
    formState: { errors },
    control,
    getValues,
  } = useForm<User>({
    resolver: yupResolver(yup.object().shape({ nickname: scheme.nickname, birth: scheme.birth })),
    mode: 'all',
    defaultValues: {
      nickname: nickname,
      birth: dayjs(birthdate).format('YYYY-MM-DD'),
    },
  });

  const join = useJoin({
    onSuccess: (data) => {
      setIsEdit(false);
      console.log(data);
      // setAuth(data);
    },
    onError: (err) => console.log(err),
  });

  const handleClick = () => {
    setIsEdit(!isEdit);
  };

  const handleSubmit = () => {
    if (isEdit && isEmpty(errors)) {
      const { nickname, birth } = getValues();
      const birthdate = dayjs(birth).valueOf();
      join.mutate({ nickname, birthdate });
    } else {
      setIsEdit(false);
    }
  };

  const handleWithdrawal = () => {
    console.log('탈퇴');
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  const description = useMemo(() => {
    const birth = getValues('birth');
    const d_day = getDDay(dayjs(birthdate));
    const countNextAge = dayjs().get('y') - +birth.slice(0, 4) + 1;
    const countMeals = +d_day * 3;
    const countBooks = Math.floor(+d_day / 7);
    const countBodyProfile = Math.floor(+d_day / 90);

    return (
      <>
        <div>
          <div>당신은 오늘부터 만 {countNextAge}살까지,</div>
          <div> {d_day}일 이라는 시간이 남았습니다.</div>
        </div>
        <div>이 시점 우리가 할 수 있는 것은?</div>
        <div>
          <div>식사 {countMeals}번</div>
          <div>바디프로필 {countBodyProfile}번 찍기</div>
          <div>독서 {countBooks}권</div>
          <div>롤 골드 티어 찍기</div>
          <div>제주 살이</div>
          {countNextAge <= 30 && <div>워킹홀리데이</div>}
          <div>⋮</div>
        </div>
      </>
    );
  }, [birthdate, getValues]);

  return (
    mounted && (
      <Layout layoutCss={layoutCss} useHeader={true}>
        <MyPageSection>
          <StoryLine>
            <NameBirthDay>
              <InputField>
                <LabelInputWrap>
                  <Text isEdit={isEdit}>별명:</Text>
                  <div style={{ alignItems: 'center', display: 'flex' }}>
                    <Controller
                      name="nickname"
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <NicknameTextField
                          value={value}
                          onChange={onChange}
                          disabled={!isEdit}
                          sx={{
                            background: `${isEdit ? '#f3f3f3' : 'none'}`,
                          }}
                          inputProps={{
                            minLength: 1,
                            maxLength: 7,
                          }}
                        />
                      )}
                    />
                  </div>
                </LabelInputWrap>
                <div className="label">
                  {!!errors?.nickname && <span css={errorCss}>{errors.nickname.message}</span>}
                </div>
                <LabelInputWrap>
                  <Text isEdit={isEdit}>생일:</Text>
                  <Controller
                    control={control}
                    name="birth"
                    render={({ field: { value, onChange } }) => {
                      const handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (event) => {
                        onChange(dayjs(event.currentTarget.value).valueOf());
                      };
                      const val = dayjs(value).format('YYYY-MM-DD');
                      return (
                        <BirthDayTextField
                          type="date"
                          value={val}
                          sx={{
                            background: `${isEdit ? '#f3f3f3' : 'none'}`,
                          }}
                          onChange={handleChange}
                          disabled={!isEdit}
                        />
                      );
                    }}
                  />
                </LabelInputWrap>
                <div className="label">{!!errors?.birth && <span css={errorCss}>{errors.birth.message}</span>}</div>
              </InputField>
            </NameBirthDay>
            <Story>{description}</Story>
          </StoryLine>
        </MyPageSection>
        <ButtonSection>
          <Button buttonType={ButtonType.Basic} onClick={isEdit ? handleSubmit : handleClick}>
            {isEdit ? '저장' : '수정'}
          </Button>
          <Button buttonType={ButtonType.SignOut} onClick={handleWithdrawal}>
            회원탈퇴
          </Button>
        </ButtonSection>
      </Layout>
    )
  );
}

export default MyPage;
