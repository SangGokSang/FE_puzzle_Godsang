import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Modal } from '@mui/material';
import Box from '@mui/material/Box';
import React from 'react';

const MessageField = styled.div`
  width: 280px;
  height: 280px;
  background-color: #f0edf2;
  border: 1px solid #000000;
  border-radius: 6px;
`;

const RecipientField = styled.div`
  margin: 18px;
  color: #000000;
  font-weight: 400;
  font-size: 13px;
  line-height: 20px;
`;

const TextField = styled.div`
  margin-left: 18px;
  margin-top: 30px;
  color: #000000;
  font-weight: 400;
  font-size: 13px;
  line-height: 20px;
`;

const SenderField = styled.div`
  position: absolute;
  bottom: 18px;
  right: 18px;
  color: #000000;
  font-weight: 400;
  font-size: 13px;
  line-height: 20px;
`;

type LetterProps = {
  isOpen?: boolean;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};

// 편지 읽기와 쓰기 모드 같이
function Letter(props: LetterProps) {
  const { isOpen, setIsOpen } = props;
  const handleCloseModal = () => {
    setIsOpen(false);
  };
  return (
    <Modal open={isOpen} onClose={handleCloseModal}>
      <Box
        css={css`
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        `}>
        <MessageField>
          <RecipientField> To.별명 </RecipientField>
          <TextField>Text...</TextField>
          <SenderField> From.누구 </SenderField>
        </MessageField>
      </Box>
    </Modal>
  );
}

export default Letter;
