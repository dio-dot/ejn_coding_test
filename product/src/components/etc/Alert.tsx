import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "../../lib/reducers";

interface Props {}

const Alert: React.FC<Props> = () => {
  const { alertMessage, alertHidden } = useSelector(
    (state: RootState) => state.todo
  );
  return (
    <AlertStyle className={alertHidden && "hidden"}>{alertMessage}</AlertStyle>
  );
};

const AlertStyle = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 30px;
  color: white;
  background: #00000099;
  left: 0;
  text-align: center;
  font-size: 20px;
  transition: ease-in 0.6s;
  line-height: 30px;
  &.hidden {
    transform: translateY(30px);
  }
`;
export default Alert;
