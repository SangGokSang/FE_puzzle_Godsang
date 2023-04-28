import React, { ReactElement } from 'react';
import { css } from '@emotion/react';
import Button, { ButtonType } from 'src/components/button/Button';
import { Modal, TextField as MuiTextField } from '@mui/material';
import Layout from 'src/components/common/Layout';
import { MessageCard, RecipientField, SenderField, TextBodyField, letterInterfaceCss } from './style';
import { ButtonSection } from 'src/core/styles/common';
import { BackIcon, TrashCanIcon } from 'src/core/icons';
import { Controller, useForm } from 'react-hook-form';
import { useDeleteMessage, useSendDM } from 'src/module/message';
import styled from '@emotion/styled';
import { ExceptionCode } from 'src/core/const/enum';
import KakaoAdFit from 'src/components/kakaoAd/kakaoAdFit';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { PUZZLES_KEY, PuzzleMSG, Puzzles } from 'src/module/puzzles';
import { isEmpty } from 'lodash';

type LetterProps = {
  isOpen: boolean;
  onClose: () => void;
  data: (PuzzleMSG & { puzzleId: number }) | number | null;
  isWrite: boolean;
};

export type MessageData = {
  from: string;
  to: string;
  content: string;
};

const buttonSectionCss = css`
  position: absolute;
  bottom: 15px;
`;

const TextField = styled(MuiTextField)<{ isError: boolean }>`
  height: unset;
  & .MuiInputBase-input {
    width: 100%;
    padding: 0;
  }
  input,
  textarea {
    &::placeholder {
      color: ${(props) => (props.isError ? 'red' : 'black')};
    }
  }
`;

const AdArea = styled.div`
  position: absolute;
  bottom: -45px;
  width: 100%;
`;

// 편지 읽기와 쓰기 모드 같이
function Letter(props: LetterProps): ReactElement {
  const { isOpen, onClose, isWrite, data } = props;
  const router = useRouter();
  const queryClient = useQueryClient();
  const { control, getValues, reset, formState, setError, setFocus } = useForm<MessageData>({
    defaultValues: { from: '', to: '', content: '' },
    mode: 'onChange',
  });

  const afterLogic = (data: Puzzles) => {
    const userId = router.query.userId as string;
    queryClient.setQueryData([PUZZLES_KEY, `${userId}`], data);
    handleCloseModal();
    reset();
  };
  const sendDM = useSendDM({
    onSuccess: (data) => afterLogic(data),
    onError: ({ code }) => {
      if (code === ExceptionCode.messageFull) {
        alert('죄송합니다, 퍼즐이 완성되어 DM을 보낼 수 없습니다.\n다른 퍼즐로 DM을 보내주세요!');
      }
    },
  });
  const deleteDM = useDeleteMessage({
    onSuccess: (data) => afterLogic(data),
  });

  const handleCloseModal = () => {
    if (onClose instanceof Function) {
      onClose();
    }
  };

  const handleDeleteDM = () => {
    if (confirm('메세지를 삭제하시겠나요? \n(삭제 후 메세지는 복구되지 않습니다.)')) {
      const { puzzleId, id } = data as PuzzleMSG & { puzzleId: number };
      deleteDM.mutate({ puzzleId, messageId: id });
    }
  };

  const onSubmit = () => {
    const value = getValues();

    if (isEmpty(value.to)) {
      setError('to', { message: 'To. 를 입력해주세요!' });
      setFocus('to');
    }
    if (isEmpty(value.content)) {
      setError('content', { message: '메세지를 입력해주세요!' });
      setFocus('content');
    }
    if (isEmpty(value.from)) {
      setError('from', { message: 'From. 을 입력해주세요!' });
      setFocus('from');
    }

    if (isEmpty(formState.errors) && isWrite && typeof data === 'number') {
      sendDM.mutate({ puzzleId: data, message: value });
    }
  };

  console.log(formState.errors);

  return (
    <>
      <Modal open={isOpen} onClose={handleCloseModal}>
        <Layout useHeader={false}>
          <div css={letterInterfaceCss}>
            <BackIcon onClick={handleCloseModal} />
            {!isWrite && <TrashCanIcon onClick={handleDeleteDM} />}
          </div>
          <MessageCard>
            <RecipientField>
              {isWrite ? (
                <Controller
                  name="to"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      onChange={onChange}
                      inputProps={{ minLength: 1, maxLength: 19 }}
                      className="to"
                      isError={!!formState.errors.to}
                      placeholder={formState.errors.to?.message || 'To. 소중한 사람에게'}
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
                  rules={{ required: true }}
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
                      isError={!!formState.errors.content}
                      placeholder={formState.errors.content?.message || '응원의 메시지를 보내세요!'}
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
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      isError={!!formState.errors.from}
                      value={value}
                      onChange={onChange}
                      inputProps={{
                        minLength: 1,
                        maxLength: 19,
                      }}
                      className="from"
                      placeholder={formState.errors.from?.message || 'From. 귀여운 누군가'}
                    />
                  )}
                />
              ) : (
                <>From. {(data as MessageData)?.from}</>
              )}
            </SenderField>
          </MessageCard>
          {isWrite && (
            <>
              <ButtonSection css={buttonSectionCss}>
                <Button buttonType={ButtonType.Text} onClick={onSubmit}>
                  DM 보내기
                </Button>
              </ButtonSection>
            </>
          )}
          <AdArea>
            <KakaoAdFit />
          </AdArea>
        </Layout>
      </Modal>
    </>
  );
}

export default Letter;
