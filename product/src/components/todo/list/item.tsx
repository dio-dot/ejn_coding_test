import React, { memo, useCallback, ChangeEvent } from "react";
import styled from "styled-components";
import {
  TODO,
  deleteTodoRequest,
  setEditTodo,
  patchTodoRequest,
} from "../../../lib/reducers/todo";
import { useDispatch } from "react-redux";

interface Props {
  todo: TODO;
}

const Item: React.FC<Props> = ({ todo }) => {
  const dispatch = useDispatch();

  /** Event Handler */
  const onDeleteClick = useCallback(() => {
    dispatch(deleteTodoRequest(todo.id));
  }, [todo.id, dispatch]);
  const onEditClick = useCallback(() => {
    dispatch(setEditTodo(todo));
  }, [todo, dispatch]);
  const onCompleteChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      dispatch(
        patchTodoRequest({
          ...todo,
          complete: e.target.checked,
        })
      );
    },
    [todo, dispatch]
  );

  return (
    <ItemStyle className={"p" + todo.priority}>
      <Complete
        type="checkbox"
        defaultChecked={todo.complete}
        onChange={onCompleteChange}
      />
      <Title>{todo.title}</Title>
      <Content>{todo.contents}</Content>
      <Deadline>
        {new Date(todo.deadline).toISOString().substring(0, 10)}
      </Deadline>
      <ButtonGroup>
        <button onClick={onEditClick} className="edit" />
        <button onClick={onDeleteClick}>X</button>
      </ButtonGroup>
    </ItemStyle>
  );
};

const ItemStyle = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  height: 70px;
  padding: 10px;
  margin-top: 7px;
  box-shadow: 1px 1px 3px #b9b9b9;
  &.p0 {
    background: #00800030;
  }
  &.p1 {
    background: #ffa50030;
  }
  &.p2 {
    background: #ff000030;
  }
`;
const Complete = styled.input`
  width: 30px;
  height: 30px;
  cursor: pointer;
`;
const Title = styled.div`
  flex: 0 120px;
  padding-left: 10px;
  font-size: 18px;
  overflow: hidden;
  white-space: nowrap;
`;
const Content = styled.div`
  flex: 1;
  padding-left: 10px;
  overflow: hidden;
  word-break: break-all;
`;
const Deadline = styled.div`
  font-size: 11px;
`;
const ButtonGroup = styled.div`
  display: flex;
  /* flex-direction: column; */
  align-items: center;
  position: absolute;
  top: 5px;
  right: 0;
  button {
    background: none;
    border: 0px;
    font-size: 15px;
    cursor: pointer;
    &.edit {
      height: 15px;
      width: 15px;
      background-size: contain;
      background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNNy4xMjcgMjIuNTYybC03LjEyNyAxLjQzOCAxLjQzOC03LjEyOCA1LjY4OSA1LjY5em0xLjQxNC0xLjQxNGwxMS4yMjgtMTEuMjI1LTUuNjktNS42OTItMTEuMjI3IDExLjIyNyA1LjY4OSA1LjY5em05Ljc2OC0yMS4xNDhsLTIuODE2IDIuODE3IDUuNjkxIDUuNjkxIDIuODE2LTIuODE5LTUuNjkxLTUuNjg5eiIvPjwvc3ZnPg==");
    }
  }
`;

export default memo(Item);
