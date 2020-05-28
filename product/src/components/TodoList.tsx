import React, { useEffect, useCallback, useRef, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadTodosRequest } from "../lib/reducers/todo";
import { RootState } from "../lib/reducers";
import TodoItem from "./TodoItem";
import styled from "styled-components";
import Empty from "./etc/Empty";

interface TodoListProps {}

const TodoList: React.FC<TodoListProps> = memo(() => {
  const dispatch = useDispatch();
  const { todos, hasMoreTodo, filter } = useSelector(
    (state: RootState) => state.todo
  );
  const countRef = useRef<Array<number>>([]);

  /** Event Handler */
  const onScroll = useCallback(() => {
    if (
      window.scrollY + document.documentElement.clientHeight >
      document.documentElement.scrollHeight - 300
    ) {
      if (hasMoreTodo) {
        const length = todos?.length;
        if (!countRef.current.includes(length)) {
          dispatch(loadTodosRequest({ start: length, filter }));
          countRef.current.push(length);
        }
      }
    }
  }, [todos, hasMoreTodo, dispatch, filter]);

  /** Effect Hooks */
  useEffect(() => {
    dispatch(loadTodosRequest({ start: 0, filter }));
  }, [dispatch, filter]);
  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [todos, hasMoreTodo, onScroll]);

  return (
    <TodoListStyle>
      {todos.length > 0 ? (
        todos.map((todo, index) => {
          return todo && <TodoItem key={index} todo={todo} />;
        })
      ) : (
        <Empty> empty todo</Empty>
      )}
    </TodoListStyle>
  );
});

const TodoListStyle = styled.div`
  padding: 5px;
`;

export default TodoList;
