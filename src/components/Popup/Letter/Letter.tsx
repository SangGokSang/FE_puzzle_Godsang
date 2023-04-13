import { css } from '@emotion/react';
import Button, { ButtonType } from 'src/components/button/Button';
import { Modal, TextField as MuiTextField } from '@mui/material';
import React, { ReactElement } from 'react';
import Layout from 'src/components/common/Layout';
import { MessageCard, RecipientField, SenderField, TextBodyField } from './style';
import { ButtonSection } from 'src/core/styles/common';
import { BackIcon } from 'src/core/icons';
import { Controller, useForm } from 'react-hook-form';
import { useSendDM } from 'src/module/message';
import { useQueryClient } from '@tanstack/react-query';
import { PUZZLES_KEY } from 'src/module/puzzles';
import styled from '@emotion/styled';

type LetterProps = {
  isOpen: boolean;
  onClose: () => void;
  data: MessageData | number | null;
  isWrite: boolean;
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

const TextField = styled(MuiTextField)`
  height: unset;
  &.from {
    direction: rtl;
    & .MuiInputBase-input {
      text-align: unset;
    }
  }
  & .MuiInputBase-input {
    width: 100%;
    padding: 0;
  }
`;

// 편지 읽기와 쓰기 모드 같이
function Letter(props: LetterProps): ReactElement {
  const { isOpen, onClose, isWrite, data } = props;
  const { control, getValues, reset } = useForm<MessageData>({ defaultValues: { from: '', to: '', content: '' } });
  const client = useQueryClient();
  const sendDM = useSendDM({
    onSuccess: () => {
      client.invalidateQueries([PUZZLES_KEY]);
      handleCloseModal();
      reset();
    },
  });

  const handleCloseModal = () => {
    if (onClose instanceof Function) {
      onClose();
    }
  };

  const onSubmit = () => {
    const value = getValues();
    if (isWrite && typeof data === 'number') {
      sendDM.mutate({ puzzleId: data, message: value });
    }
  };

  return (
    <Modal open={isOpen} onClose={handleCloseModal}>
      <Layout useHeader={false}>
        <span className="back-button">
          <BackIcon onClick={handleCloseModal} />
        </span>
        <MessageCard>
          <RecipientField>
            {isWrite ? (
              <Controller
                name="to"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    value={value}
                    onChange={onChange}
                    inputProps={{ minLength: 1, maxLength: 19 }}
                    className="to"
                    placeholder="To. 소중한 사람에게"
                  />
                )}
              />
            ) : (
              <>To.{(data as MessageData)?.to}</>
            )}
          </RecipientField>
          <TextBodyField>
            {isWrite ? (
              <Controller
                name="content"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    value={value}
                    onChange={onChange}
                    sx={{
                      width: '240px',
                      maxHeight: '240px',
                      '& .MuiInputBase-root': {
                        padding: 0,
                        paddingTop: '4px',
                      },
                      '& .MuiInputBase-input': {
                        width: '100% !important',
                      },
                    }}
                    multiline
                    maxRows="8"
                    className="content"
                    inputProps={{ maxLength: 102 }}
                    placeholder="응원의 메시지를 보내세요!"
                  />
                )}
              />
            ) : (
              (data as MessageData)?.content
            )}
          </TextBodyField>
          <SenderField>
            {isWrite ? (
              <Controller
                name="from"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    value={value}
                    onChange={onChange}
                    inputProps={{ minLength: 1, maxLength: 19 }}
                    className="from"
                    placeholder="From. 귀여운 누군가"
                  />
                )}
              />
            ) : (
              <>From. {(data as MessageData)?.from}</>
            )}
          </SenderField>
        </MessageCard>
        {isWrite && (
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
