import React, { ChangeEvent, memo } from "react";
import styled from "styled-components";

interface Props {
  maxLength: number;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  value: string;
  placeholder: string;
}

const Content: React.FC<Props> = memo((props) => {
  return <ContentStyle {...props} />;
});

const ContentStyle = styled.textarea`
  resize: none;
  flex: 1;
  font-size: 13px;
  box-shadow: inset 0 2px 2px #f7f7f7;
  border: 1px solid #e9e9e9;
  line-height: 16px;
  padding: 6px 10px;
`;

export default Content;
