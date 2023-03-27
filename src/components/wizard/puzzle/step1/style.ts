import styled from '@emotion/styled';
import { DatePicker as MUIDatePikcer } from '@mui/x-date-pickers';

export const DatePicker = styled(MUIDatePikcer)`
  background: #f3f3f3;
  border-radius: 6px;
  & .MuiInputBase-root {
    height: 100%;
  }
`;
