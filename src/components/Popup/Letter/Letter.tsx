import { css } from '@emotion/react';
import Button, { ButtonType } from 'src/components/button/Button';
import { Modal, TextField } from '@mui/material';
import React, { ReactElement } from 'react';
import Layout from 'src/components/common/Layout';
import { MessageCard, RecipientField, SenderField, TextBodyField } from './style';
import { ButtonSection } from 'src/core/styles/common';
import { BackIcon } from 'src/core/icons';
import { Controller, useForm } from 'react-hook-form';
import { useSendDM } from 'src/module/message';

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

// 편지 읽기와 쓰기 모드 같이
function Letter(props: LetterProps): ReactElement {
  const { isOpen, onClose, isWrite, data } = props;
  const { control, getValues, reset } = useForm<MessageData>({ defaultValues: { from: '', to: '', content: '' } });
  const sendDM = useSendDM({
    onSuccess: () => {
      handleCloseModal();
      reset();
    },
  });
  // const [isWrite, setIsEdit] = useState<boolean>(false);

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
            To.
            {isWrite ? (
              <Controller
                name="to"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    value={value}
                    onChange={onChange}
                    inputProps={{ minLength: 1, maxLength: 7 }}
                    className="to"
                    placeholder="누구"
                  />
                )}
              />
            ) : (
              (data as MessageData)?.to
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
                    }}
                    multiline
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
            From.
            {isWrite ? (
              <Controller
                name="from"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    value={value}
                    onChange={onChange}
                    sx={{
                      width: '80px',
                    }}
                    inputProps={{ minLength: 1, maxLength: 7 }}
                    className="from"
                    placeholder="누구"
                  />
                )}
              />
            ) : (
              (data as MessageData)?.from
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
