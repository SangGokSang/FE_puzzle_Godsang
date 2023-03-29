import React, { ChangeEventHandler, useState } from 'react';
import { css } from '@emotion/react';
import { ButtonSection } from 'src/core/styles/common';
import Button from 'src/components/button';
import { ButtonType } from 'src/components/button/Button';
import { useRouter } from 'next/router';
import Layout from 'src/components/common/Layout';
import styled from '@emotion/styled';
import { TextField } from '@mui/material';
import { Controller, useForm, useFormContext } from 'react-hook-form';
import dayjs from 'dayjs';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

export type userType = {
  nickname: string; // 길이 최소 1글자 최대 7글자 공백 안됨, 특수문자 안됨
  birthdate: number; // milliseconds
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
  height: calc(100% - 60px);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StoryLine = styled.div`
  width: 500px;
  height: 400px;
  font-weight: 400;
  font-size: 22px;
  line-height: 33px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const NameBirthDay = styled.div`
  display: flex;
  align-items: center;
`;

const Text = styled.span`
  position: relative;
  top: 15px;
`;

const Story = styled.div`
  margin-left: 14px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const schema = yup.object().shape({
  nickname: yup
    .string()
    .required('반드시 입력해주세요.')
    .min(2, '한 글자 이상 입력해주세요.')
    .max(10, '일곱 자 이하만 입력 가능합니다.'),
  birth: yup.number().required('반드시 입력해주세요.'),
});

function index() {
  const { control, watch } = useFormContext();
  const router = useRouter();
  const createForm = useForm<userType>({
    resolver: yupResolver(schema),
    mode: 'all',
    defaultValues: {
      nickname: '',
      birthdate: Date.now(),
    },
  });

  const { formState, getFieldState } = createForm;

  const handleClick = () => {
    if (isEdit) {
      const { getValues } = createForm;
      console.log(getValues());
      // if(submit response 200 ok){
      //   setIsEdit(false);
      // }
      setIsEdit(false);
    } else {
      // 아닐경우
      setIsEdit(true);
    }
  };

  const [isEdit, setIsEdit] = useState<boolean>(true);

  return (
    <Layout layoutCss={layoutCss} useHeader={true}>
      <MyPageSection>
        <StoryLine>
          <NameBirthDay>
            <div>
              <Controller
                name="nickname"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    value={value}
                    onChange={onChange}
                    disabled={!isEdit}
                    sx={{
                      width: '90px',
                      height: '50px',
                      background: `${isEdit ? '#f3f3f3' : 'none'}`,
                      position: 'relative',
                      '& .MuiInputBase-input.Mui-disabled': {
                        WebkitTextFillColor: '#000000',
                        fontFamily: 'GmarketSans',
                        fontSize: '22px',
                        textAlign: 'center',
                      },
                    }}
                    inputProps={{
                      minLength: 1,
                      maxLength: 7,
                    }}
                    placeholder="별명을 입력해주세요!"
                  />
                )}
              />
              <Text>님은</Text>
              <Controller
                control={control}
                name="birth"
                render={({ field: { value, onChange } }) => {
                  const handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (event) => {
                    onChange(dayjs(event.currentTarget.value).valueOf());
                  };
                  const val = dayjs(value).format('YYYY-MM-DD');
                  return (
                    <TextField
                      type="date"
                      value={val}
                      sx={{
                        width: '190px',
                        height: '50px',
                        background: `${isEdit ? '#f3f3f3' : 'none'}`,
                        '& .MuiInputBase-input.Mui-disabled': {
                          WebkitTextFillColor: '#000000',
                          fontFamily: 'GmarketSans',
                          fontSize: '22px',
                          textAlign: 'center',
                        },
                      }}
                      onChange={handleChange}
                      disabled={!isEdit}
                    />
                  );
                }}
              />
              <Text>이고,</Text>
            </div>
          </NameBirthDay>
          <Story>
            <div>
              <div>2023년 6월 부터 만 30살까지,</div>
              <div> 576일이라는 시간이 남았습니다.</div>
            </div>

            <div>이 시점에서 우리가 할 수 있는 것은?</div>

            <div>
              <div>식사 300번</div>
              <div>바프 3번 찍기</div>
              <div>독서 75권</div>
              <div>롤 골드 티어</div>
              <div>제주도 1년 살이</div>
              <div>워킹홀리데이</div>
            </div>
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

export default index;
