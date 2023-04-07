import React, { PropsWithChildren, SyntheticEvent } from 'react';
import styled from '@emotion/styled';

export enum ButtonType {
  Basic = 'basic',
  Disabled = 'disabled',
  Text = 'text',
}

type ButtonProps = {
  buttonType: ButtonType;
  onClick: (event: SyntheticEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
};

const Btn = styled.button`
  width: 100%;
  height: 60px;
  border: 1px solid #000000;
  border-radius: 6px;
  font-size: 18px;
  font-weight: 500;
  padding: 16px 0;
  cursor: pointer;

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
`;

function Button({ children, buttonType, onClick, disabled = false }: PropsWithChildren<ButtonProps>) {
  return (
    <Btn className={buttonType} onClick={onClick} disabled={disabled}>
      {children}
    </Btn>
  );
}

export default Button;
