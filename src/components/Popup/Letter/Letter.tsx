import { css } from '@emotion/react';
import Button, { ButtonType } from 'src/components/button/Button';
import { Modal, TextField } from '@mui/material';
import React, { useState } from 'react';
import Layout from 'src/components/common/Layout';
import { MessageCard, RecipientField, SenderField, TextBodyField } from './style';
import { ButtonSection } from 'src/core/styles/common';
import { BackIcon } from 'src/core/icons';
import { Controller, useForm, useFormContext } from 'react-hook-form';

type LetterProps = {
  isOpen: boolean;
  onClose: () => void;
  data: MessageData | null;
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

const Bar = React.forwardRef((props: any, ref: any) => (
  <span {...props} ref={ref}>
    {props.children}
  </span>
));

// 편지 읽기와 쓰기 모드 같이
function Letter(props: LetterProps) {
  const { isOpen, onClose } = props;
  const { control, watch } = useForm<MessageData>({ defaultValues: { from: '', to: '', content: '' } });
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const handleCloseModal = () => {
    if (onClose instanceof Function) {
      onClose();
    }
  };

  const onSubmit = () => {
    console.log('submit');
  };

  return (
    <Modal open={isOpen} onClose={handleCloseModal}>
      <Bar>
        <Layout useHeader={false}>
          <span className="back-button">
            <BackIcon onClick={handleCloseModal} />
          </span>
          <MessageCard>
            <RecipientField>
              To.
              {isEdit ? (
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
                ' 누구'
              )}
            </RecipientField>
            <TextBodyField>
              {isEdit ? (
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
                'Text...'
              )}
            </TextBodyField>
            <SenderField>
              From.
              {isEdit ? (
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
      </Bar>
    </Modal>
  );
}

export default Letter;
