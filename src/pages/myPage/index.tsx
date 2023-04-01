import React, { ChangeEventHandler, useMemo, useState } from 'react';
import { css } from '@emotion/react';
import { ButtonSection } from 'src/core/styles/common';
import Button from 'src/components/button';
import { ButtonType } from 'src/components/button/Button';
import Layout from 'src/components/common/Layout';
import styled from '@emotion/styled';
import { TextField } from '@mui/material';
import { Controller, useForm, useFormContext } from 'react-hook-form';
import dayjs from 'dayjs';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { getDDay } from 'src/core/util/util';

export type User = {
  nickname: string; // 길이 최소 1글자 최대 7글자 공백 안됨, 특수문자 안됨
  birth: number; // milliseconds
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

export const errorCss = css`
  margin-left: 12px;
  font-size: 11.5px;
  color: red;
`;

const MyPageSection = styled.section`
  width: 100%;
  height: calc(100% - 60px);
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
  gap: 20px;
`;

const NicknameTextField = styled(TextField)`
  width: 100px;
  height: 50px;
  position: relative;
  .MuiInputBase-input.Mui-disabled {
    -webkit-text-fill-color: #000000;
    font-family: 'GmarketSans';
    font-size: 18px;
    text-align: center;
  }
`;

const BirthDayTextField = styled(TextField)`
  width: 200px;
  height: 50px;
  .MuiInputBase-input.Mui-disabled {
    -webkit-text-fill-color: #000000;
    font-family: 'GmarketSans';
    font-size: 18px;
    text-align: center;
  }
`;

const NameBirthDay = styled.div<{ isEdit: boolean }>`
  margin-left: ${({ isEdit }) => (isEdit ? '25px' : null)};
  display: flex;
  align-items: center;
`;

const Text = styled.span`
  position: relative;
  top: 15px;
`;

const Story = styled.div`
  margin-left: 26px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const schema = yup.object().shape({
  nickname: yup
    .string()
    .required('반드시 입력해주세요.')
    .min(1, '한 글자 이상 입력해주세요.')
    .max(7, '일곱 자 이하만 입력 가능합니다.'),
  birth: yup.number().required('반드시 입력해주세요.'),
});

function MyPage() {
  // const { control, watch } = useFormContext();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const { watch } = useFormContext<User>();

  const createForm = useForm<User>({
    resolver: yupResolver(schema),
    mode: 'all',
    defaultValues: {
      nickname: '',
      birth: Date.now(),
    },
  });

  const {
    formState: { errors },
    getFieldState,
    control,
  } = createForm;

  const { birth } = watch();

  const handleClick = () => {
    if (isEdit) {
      const { getValues } = createForm;
      console.log(getValues());
      setIsEdit(false);
    } else {
      setIsEdit(true);
    }
  };

  const description = useMemo(() => {
    const dDay = isNaN(birth) ? '0' : getDDay(dayjs(birth));
    const countMeals = +dDay * 3;
    const countBooks = Math.floor(+dDay / 7);
    const countBodyProfile = Math.floor(+dDay / 90);
    return (
      <div>
        <div>식사 `${countMeals}`번</div>
        <div>바프 `${countBodyProfile}`번 찍기</div>
        <div>독서 `${countBooks}`권</div>
        <div>롤 골드 티어</div>
        <div>제주도 1년 살이</div>
        <div>워킹홀리데이</div>
        <div>⋮</div>
      </div>
    );
  }, [birth]);

  return (
    <Layout layoutCss={layoutCss} useHeader={true}>
      <MyPageSection>
        <StoryLine>
          <NameBirthDay isEdit={isEdit}>
            <div className="label">{!!errors?.nickname && <span css={errorCss}>{errors.nickname.message}</span>}</div>
            <div>
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
                    placeholder="별명"
                  />
                )}
              />
              <Text>님은</Text>
              <br />
              <div className="label">{!!errors?.birth && <span css={errorCss}>{errors.birth.message}</span>}</div>
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
              <Text>생 이고,</Text>
            </div>
          </NameBirthDay>
          <Story>
            <div>
              <div>2023년 6월 부터 만 30살까지,</div>
              <div> 576일이라는 시간이 남았습니다.</div>
            </div>

            <div>이 시점 우리가 할 수 있는 것은?</div>
            {description}
          </Story>
        </StoryLine>
      </MyPageSection>
      <ButtonSection>
        <Button buttonType={ButtonType.Basic} onClick={handleClick}>
          {isEdit ? '저장' : '수정'}
        </Button>
      </ButtonSection>
    </Layout>
  );
}

export default MyPage;
