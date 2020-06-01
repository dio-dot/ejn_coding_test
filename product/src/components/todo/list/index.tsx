import React, { memo, useRef, useEffect, useCallback } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../lib/reducers";
import { loadTodosRequest } from "../../../lib/reducers/todo";
import TodoItem from "./item";
import Empty from "./empty";
// import Empty from "../../etc/Empty";

interface Props {}
const List: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const { todos, filter, hasMoreTodo } = useSelector(
    (state: RootState) => state.todo
  );
  const countRef = useRef<Array<number>>([]);
  /** handler */
  const onScroll = useCallback(() => {
    if (
      window.scrollY + document.documentElement.clientHeight >
      document.documentElement.scrollHeight - 300
    ) {
      if (hasMoreTodo) {
        const length = todos.length;
        if (!countRef.current.includes(length)) {
          dispatch(loadTodosRequest({ start: length, filter }));
          countRef.current.push(length);
        }
      }
    }
  }, [todos.length, filter, hasMoreTodo, dispatch]);
  /** Effect Hooks */
  useEffect(() => {
    countRef.current = [];
    dispatch(loadTodosRequest({ start: 0, filter }));
  }, [filter, dispatch]);
  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [todos, onScroll]);

  return (
    <ListStyle>
      {todos.length > 0 ? (
        todos.map((todo) => {
          return todo && <TodoItem key={todo?.id} todo={todo} />;
        })
      ) : (
        <Empty>Empty todo</Empty>
      )}
    </ListStyle>
  );
};

const ListStyle = styled.div`
  padding: 5px;
`;

export default memo(List);
