import React, { ChangeEventHandler, useState } from 'react';
import { css } from '@emotion/react';
import { ButtonSection } from 'src/core/styles/common';
import Button from 'src/components/button';
import { ButtonType } from 'src/components/button/Button';
import { useRouter } from 'next/router';
import Layout from 'src/components/common/Layout';
import styled from '@emotion/styled';
import { TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
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
`;

const NameBirthDay = styled.div`
  display: flex;
  align-items: center;
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
  // const { control, watch } = useFormContext();
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
      // Edit 모드 일 경우
      const { getValues } = createForm;
      console.log(getValues());
      // if(submit response 200 ok){
      //   setIsEdit(false);
      //   router.back();
      // }
    } else {
      // 아닐경우
      setIsEdit(true);
      router.back();
    }
  };

  const [isEdit, setIsEdit] = useState<boolean>(false);

  return (
    <Layout layoutCss={layoutCss} useHeader={true}>
      <MyPageSection>
        <StoryLine>
          <NameBirthDay>
            <div>
              {/* <Controller
            name="nickname"
            control={control}
            render={({ field: { value, onChange } }) => ( */}
              <TextField
                value={'강동희'}
                // onChange={onChange}
                disabled={!isEdit}
                sx={{
                  width: '100px',
                  height: '50px',
                  background: 'none',
                  fontFamily: 'GmarketSans',
                  fontSize: '22px',
                  color: '#000000',
                  '& .MuiInputBase-input.Mui-disabled': {
                    WebkitTextFillColor: '#000000',
                    fontFamily: 'GmarketSans',
                    fontSize: '22px',
                  },
                }}
                inputProps={{ minLength: 1, maxLength: 7 }}
                placeholder="별명을 입력해주세요!"
              />
              {/* )}
          /> */}
              <span>님은</span>
              {/* <Controller
            control={control}
            name="birth"
            render={({ field: { value, onChange } }) => {
              const handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (event) => {
                onChange(dayjs(event.currentTarget.value).valueOf());
              };
              const val = dayjs(value).format('YYYY-MM-DD'); return */}
              <TextField
                type="date"
                value={'1994-10-28'}
                sx={{
                  width: '190px',
                  height: '50px',
                  background: 'none',
                  fontFamily: 'GmarketSans',
                  fontSize: '22px',
                  color: '#000000',
                  '& .MuiInputBase-input.Mui-disabled': {
                    WebkitTextFillColor: '#000000',
                    fontFamily: 'GmarketSans',
                    fontSize: '22px',
                  },
                }}
                // onChange={handleChange}
                disabled={!isEdit}
              />
              {/* }}
          /> */}
              <span>이고,</span>
            </div>
          </NameBirthDay>
          <br />
          2023년 6월 부터 만 30살까지,
          <br />
          576일이라는 시간이 남았습니다.
          <br />
          <br />
          이 시점에서 우리가 할 수 있는 것은?
          <br />
          <br />
          식사 300번
          <br />
          바프 3번 찍기
          <br /> 독서 75권
          <br /> 롤 골드 티어
          <br /> 개발자 부트캠프
          <br /> 워킹홀리데이
          <br />
        </StoryLine>
      </MyPageSection>
      <ButtonSection>
        <Button buttonType={ButtonType.Basic} onClick={handleClick}>
          {isEdit ? '저장하기' : '수정하기'}
        </Button>
      </ButtonSection>
    </Layout>
  );
}

export default index;
