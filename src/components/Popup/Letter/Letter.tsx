import { css } from '@emotion/react';
import Button, { ButtonType } from 'src/components/button/Button';
import { Modal, TextField } from '@mui/material';
import React, { useState } from 'react';
import Layout from 'src/components/common/Layout';
import { MessageCard, RecipientField, SenderField, TextBodyField } from './style';
import { ButtonSection } from 'src/core/styles/common';
import { BackIcon } from 'src/core/icons';
import { Controller, useFormContext } from 'react-hook-form';

type LetterProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export type MessageData = {
  from: string;
  to: string;
  content: string;
};

const buttonSectionCss = css`
  position: absolute;
  bottom: 0;
`;

// 편지 읽기와 쓰기 모드 같이
function Letter(props: LetterProps) {
  const { isOpen, setIsOpen } = props;
  const [isEdit, setIsEdit] = useState<boolean>(true);
  const [massageData, setMessageData] = useState<MessageData>({
    from: '',
    to: '',
    content: '',
  });

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const onSubmit = () => {
    console.log('submit');
  };

  return (
    <Modal open={isOpen} onClose={handleCloseModal}>
      <Layout useHeader={false}>
        <span className="back-button">
          <BackIcon onClick={handleCloseModal} />
        </span>

        <MessageCard>
          <RecipientField>
            To.
            {isEdit ? <TextField inputProps={{ maxLength: 10 }} className="to" placeholder="누구" /> : ' 누구'}
          </RecipientField>
          <TextBodyField>
            {isEdit ? (
              <TextField
                sx={{
                  width: '240px',
                  maxHeight: '240px',
                }}
                multiline
                className="content"
                inputProps={{ maxLength: 102 }}
                placeholder="응원의 메시지를 보내세요!"
              />
            ) : (
              'Text...'
            )}
          </TextBodyField>
          <SenderField>
            From.
            {isEdit ? (
              <TextField
                sx={{
                  width: '80px',
                }}
                inputProps={{ maxLength: 10 }}
                className="from"
                placeholder="누구"
              />
            ) : (
              ' 누구'
            )}
          </SenderField>
        </MessageCard>

        {isEdit && (
          <ButtonSection css={buttonSectionCss}>
            <Button buttonType={ButtonType.Text} onClick={onSubmit}>
              DM 보내기
            </Button>
          </ButtonSection>
        )}
      </Layout>
    </Modal>
  );
}

export default Letter;
