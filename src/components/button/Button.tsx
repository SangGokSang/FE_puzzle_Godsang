import React, { PropsWithChildren, SyntheticEvent } from 'react';
import styled from '@emotion/styled';

export enum ButtonType {
  Basic = 'basic',
  Disabled = 'disabled',
  Text = 'text',
  SignOut = 'signOut',
}

type ButtonProps = {
  buttonType: ButtonType;
  onClick: (event: SyntheticEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  isClicked?: boolean;
  disabledTime?: number | undefined;
  remainingTime?: number | undefined;
};

const Btn = styled.button<{ isDisabled: boolean }>`
  width: 100%;
  height: 60px;
  border: 1px solid #000000;
  border-radius: 6px;
  font-size: 18px;
  font-weight: 500;
  padding: 16px 0;
  cursor: ${(props) => !props.isDisabled && `pointer`};

  &.basic {
    color: #ffffff;
    background-color: #9148da;
  }

  &.text {
    background-color: #ffffff;
    color: #9148da;
  }

  &.disabled {
    background-color: #cecece;
    color: #727272;
    border: 1px solid #727272;
  }

  &.signOut {
    background-color: transparent;
    border: none;
    color: #9148da;
    font-weight: 500;
    font-size: 13px;
    line-height: 28px;
    text-decoration: underline;
  }
`;

function Button({
  children,
  buttonType,
  onClick,
  disabled = false,
  isClicked,
  disabledTime,
  remainingTime,
}: PropsWithChildren<ButtonProps>) {
  const disabledButtonStyle = {
    backgroundColor: '#e6e6e6',
    backgroundImage: `linear-gradient(90deg, #9148da ${
      (((disabledTime as number) - (remainingTime as number)) / (disabledTime as number)) * 100
    }%, #e6e6e6 ${(((disabledTime as number) - (remainingTime as number)) / (disabledTime as number)) * 100}%)`,
    color: '#999',
    cursor: 'not-allowed',
    width: '100%',
    height: '60px',
    border: '1px solid #000000',
    borderRadius: '6px',
    fontSize: '18px',
    fontWeight: '500',
    padding: '16px 0',
  };
  return (
    <Btn
      style={isClicked ? disabledButtonStyle : undefined}
      className={!isClicked ? buttonType : undefined}
      onClick={onClick}
      disabled={disabled}
      isDisabled={disabled}>
      {isClicked ? `${Math.ceil((remainingTime as number) / 1000)}초 후 열쇠를 획득하세요` : children}
    </Btn>
  );
}

export default Button;
