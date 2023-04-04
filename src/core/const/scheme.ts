import dayjs from 'dayjs';
import * as yup from 'yup';

export const scheme = {
  nickname: yup
    .string()
    .required('별명을 입력해주세요.')
    .min(1, '한 글자 이상 입력해주세요.')
    .max(7, '일곱 자 이하만 입력 가능합니다.')
    .test('include_space', '별명에 공백을 포함시킬 수 없습니다.', (value) => !/[\s]/g.test(value)),
  birth: yup
    .number()
    .typeError('숫자를 입력해주세요.')
    .required('생일을 반드시 입력해주세요.')
    .max(dayjs().subtract(1, 'day').valueOf(), '오늘과 미래의 날짜를 입력하실 수 없습니다.'),
  category: yup.string().required('카테고리를 반드시 입력해주세요'),
  goal: yup
    .string()
    .required('목표를 입력해주세요')
    .min(2, '목표를 두 글자 이상 입력해주세요.')
    .max(30, '목표는 삼십 자 이하만 입력 가능합니다.'),
};
