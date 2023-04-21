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
import { useSetRecoilState } from 'recoil';
import auth from 'src/recoil/auth';
import { useJoin } from 'src/module/join';
import { isEmpty } from 'lodash';
import { useSyncRecoil } from 'src/core/hooks/useSyncRecoil';
import { authDefaultValue } from 'src/recoil/auth/atom';
import { User as RecoilUser } from 'src/recoil/auth/type';
import { useWithdraw } from 'src/module/auth/hooks/useWithdraw';
import Image from 'next/image';
import GoogleAd from 'src/components/googleAd/GoogldAd';

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
  height: 100%;
  padding-top: 40px;
  font-weight: 400;
  font-size: 20px;
  line-height: 26px;
  display: flex;
  flex-direction: column;
  gap: 5px;

  @media screen and (min-width: 768px) {
    width: 100%;
    padding-top: 10%;
  }
`;

const InputField = styled.div`
  min-height: 95px;
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  font-size: 14px;
`;

const LabelInputWrap = styled.div`
  display: flex;
  align-items: center;
`;

const UserTextField = styled(TextField)<{ isEdit: boolean }>`
  width: 200px;
  height: 28px;
  background-color: ${(props) => (props.isEdit ? '#f3f3f3' : '#fff')};

  input::-webkit-date-and-time-value {
    text-align: left;
  }

  .MuiInputBase-root {
    height: 28px;
  }
  .MuiInputBase-input {
    padding: 3px;
  }
  .MuiInputBase-input.Mui-disabled {
    -webkit-text-fill-color: #000000;
    font-family: 'GmarketSans';
    font-size: 15px;
    padding: 0;
    padding-left: 10px;
  }
`;

const Text = styled.div<{ isEdit: boolean }>`
  margin-right: ${({ isEdit }) => (isEdit ? '10px' : null)};
  height: 28px;
  display: flex;
  align-items: center;
`;

const Story = styled.div`
  margin-left: 15px;
  display: flex;
  flex-direction: column;
  gap: 10px;

  .list {
    margin-left: 4px;
    display: flex;
    gap: 8px;
    flex-direction: column;
    .row {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 12px;
    }
  }
`;

const errLabel = css`
  font-size: 10px;
  min-height: 20px;
  line-height: 20px;
  color: red;
`;

export const ButtonSection = styled.section`
  width: 100%;
  height: 85px;
  position: absolute;
  bottom: 0;
`;

function MyPage() {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const setAuth = useSetRecoilState(auth);
  const { nickname, birthdate } = useSyncRecoil<RecoilUser>({ atom: auth, defaultValue: authDefaultValue });
  const withdraw = useWithdraw();

  const {
    formState: { errors },
    control,
    getValues,
    setValue,
  } = useForm<User>({
    resolver: yupResolver(yup.object().shape({ nickname: scheme.nickname, birth: scheme.birth })),
    mode: 'all',
    defaultValues: {
      nickname: nickname,
      birth: dayjs(birthdate).format('YYYY-MM-DD'),
    },
  });

  const buttonDisabled = isEdit && !isEmpty(errors);

  const join = useJoin({
    onSuccess: (data) => {
      setIsEdit(false);
      setAuth((prev) => ({ ...prev, ...data }));
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
    if (confirm('정말로 탈퇴 하실건가요? 🫣')) {
      withdraw.mutate();
    }
  };

  const description = useMemo(() => {
    const d_day = getDDay(dayjs(birthdate));
    const countMeals = d_day * 3; // 하루에 3끼 (남은일수 * 3)
    const countSquat = d_day * 60; // 하루에 60개 기준 (남은일수 * 60)
    const countBooks = Math.floor(d_day / 7); // 일주일에 한권 기준
    const countLoL = d_day * 2; // 하루에 2판 기준
    const countTravel = Math.round(d_day / 365); // 일년에 2번 기준
    const getUrl = (type: string) => `/assets/images/mypage/${type}.png`;

    return (
      <div
        css={css`
          font-size: 13px;
          display: flex;
          flex-direction: column;
          gap: 14px;
        `}>
        <div>
          <span>축하해요!</span>
          <div>{d_day}일 이라는 시간을 선물로 받았어요 🥳</div>
          <p>선물받은 시간에 우리가 할 수 있는 것을 알아볼까요?</p>
        </div>
        <div className="list">
          <div className="row">
            <Image src={getUrl('lunch')} alt="밥" width="35" height="35" />
            먹는게~ 제일 좋아~🎶 {countMeals} 끼 더 버억~
          </div>
          <div className="row">
            <Image src={getUrl('squat')} alt="스쿼트" width="35" height="35" />
            원판 더더!! 스퀕 {countSquat} 회 더 할 수 있어요!
          </div>
          <div className="row">
            <Image src={getUrl('book')} alt="책" width="35" height="35" />
            {countBooks} 권을 더 읽어서 척척박사로 진화!
          </div>
          <div className="row">
            <Image src={getUrl('airplane')} alt="비행" width="35" height="35" />
            {countTravel} 번의 여행! 세계를 정복해봐요!
          </div>
          <div className="row">
            <Image src={getUrl('lol')} alt="롤" width="35" height="35" />
            캐리 미쳤네? {countLoL} 판 더하고 챌린저!
          </div>
        </div>
      </div>
    );
  }, [birthdate]);

  useEffect(() => {
    setValue('nickname', nickname);
    setValue('birth', dayjs(birthdate).format('YYYY-MM-DD'));
  }, [birthdate, nickname, setValue]);

  return (
    <Layout layoutCss={layoutCss} useHeader={true}>
      <MyPageSection>
        <StoryLine>
          <InputField>
            <LabelInputWrap>
              <Text isEdit={isEdit}>별명:</Text>
              <Controller
                name="nickname"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <UserTextField
                    value={value}
                    onChange={onChange}
                    disabled={!isEdit}
                    isEdit={isEdit}
                    inputProps={{
                      minLength: 1,
                      maxLength: 10,
                    }}
                  />
                )}
              />
            </LabelInputWrap>
            <span css={errLabel}>{!!errors?.nickname && errors.nickname.message}</span>
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
                    <UserTextField type="date" value={val} isEdit={isEdit} onChange={handleChange} disabled={!isEdit} />
                  );
                }}
              />
            </LabelInputWrap>
            <span css={errLabel}>{!!errors?.birth && errors.birth.message}</span>
          </InputField>
          <Story>{description}</Story>
        </StoryLine>
      </MyPageSection>
      <ButtonSection>
        <Button
          buttonType={buttonDisabled ? ButtonType.Disabled : ButtonType.Basic}
          disabled={buttonDisabled}
          onClick={isEdit ? handleSubmit : handleClick}>
          {isEdit ? '저장' : '수정'}
        </Button>
        <Button buttonType={ButtonType.SignOut} onClick={handleWithdrawal}>
          회원탈퇴
        </Button>
      </ButtonSection>
      <GoogleAd />
    </Layout>
  );
}

export default MyPage;
