import React, { ChangeEvent, memo } from "react";
import styled from "styled-components";

interface Props {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
  type?: string;
  flex?: string;
  min?: string;
  maxLength?: number;
  placeholder?: string;
}

const Input: React.FC<Props> = memo((props) => {
  return <InputStyle {...props} />;
});

const InputStyle = styled.input`
  flex: ${(props) => props.flex};
  font-size: 13px;
  box-shadow: inset 0 2px 2px #f7f7f7;
  border: 1px solid #e9e9e9;
  line-height: 16px;
  padding: 6px 10px;
`;

export default Input;
