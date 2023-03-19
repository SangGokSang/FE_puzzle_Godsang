import { css } from '@emotion/react';
import Button, { ButtonType } from 'src/components/button/Button';
import { Input, Modal } from '@mui/material';
import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import Layout from 'src/components/common/Layout';
import { MessageCard, RecipientField, SenderField, SwiperContainer, TextBodyField } from './style';
import { ButtonSection } from 'src/core/styles/common';
import { BackIcon } from 'src/core/icons';

type LetterProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const buttonSectionCss = css`
  position: absolute;
  bottom: 0;
`;

// 편지 읽기와 쓰기 모드 같이
function Letter(props: LetterProps) {
  const { isOpen, setIsOpen } = props;
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleSendMessage = () => {};

  return (
    <Modal open={isOpen} onClose={handleCloseModal}>
      <Layout useHeader={false}>
        <span className="back-button">
          <BackIcon onClick={handleCloseModal} />
        </span>
        <SwiperContainer>
          <Swiper pagination={true} modules={[Pagination]}>
            <SwiperSlide>
              <MessageCard>
                <RecipientField>
                  To. 누구
                  {isEdit && <Input disableUnderline={true} inputProps={{ maxLength: 10 }} placeholder="받는 사람" />}
                </RecipientField>
                <TextBodyField>
                  Text...
                  {isEdit && (
                    <Input
                      sx={{
                        width: '240px',
                        maxHeight: '240px',
                      }}
                      multiline
                      disableUnderline={true}
                      inputProps={{ maxLength: 102 }}
                      placeholder="내용을 입력하세요."
                    />
                  )}
                </TextBodyField>
                <div className="sender">
                  From. 누구
                  {isEdit && (
                    <Input
                      sx={{
                        width: '80px',
                      }}
                      disableUnderline={true}
                      inputProps={{ maxLength: 10 }}
                      placeholder="보내는 사람"
                    />
                  )}
                </div>
              </MessageCard>
            </SwiperSlide>
            <SwiperSlide>
              <MessageCard>
                <RecipientField>
                  To. 누구
                  {isEdit && <Input disableUnderline={true} inputProps={{ maxLength: 10 }} placeholder="받는 사람" />}
                </RecipientField>
                <TextBodyField>
                  Text...
                  {isEdit && (
                    <Input
                      sx={{
                        width: '240px',
                        maxHeight: '240px',
                      }}
                      multiline
                      disableUnderline={true}
                      inputProps={{ maxLength: 102 }}
                      placeholder="내용을 입력하세요."
                    />
                  )}
                </TextBodyField>
                <div className="sender">
                  From. 누구
                  {isEdit && (
                    <Input
                      sx={{
                        width: '80px',
                      }}
                      disableUnderline={true}
                      inputProps={{ maxLength: 10 }}
                      placeholder="보내는 사람"
                    />
                  )}
                </div>
              </MessageCard>
            </SwiperSlide>
          </Swiper>
        </SwiperContainer>
        {isEdit && (
          <ButtonSection css={buttonSectionCss}>
            <Button buttonType={ButtonType.Text} onClick={handleSendMessage}>
              'DM 보내기'
            </Button>
          </ButtonSection>
        )}
      </Layout>
    </Modal>
  );
}

export default Letter;
