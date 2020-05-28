import React, { useCallback, memo, ChangeEvent } from "react";
import {
  TODO,
  deleteTodoRequest,
  patchTodoRequest,
  setEditTodo,
} from "../lib/reducers/todo";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { Pencil } from "./icon";

interface TodoItemProps {
  todo: TODO;
}

const TodoItem: React.FC<TodoItemProps> = memo(({ todo }) => {
  const dispatch = useDispatch();

  /** Event Dispatch Handler */
  const onDeleteTodo = useCallback(() => {
    console.log(`DELETE ${todo.id}`);
    dispatch(deleteTodoRequest(todo.id));
  }, [todo.id, dispatch]);
  const onEditTodo = useCallback(() => {
    console.log(`EDIT ${todo.id}`);
    dispatch(setEditTodo(todo));
  }, [todo, dispatch]);
  const onChangeComplete = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      console.log(`COMPLETE ${todo.id}`);
      todo.complete = e.target.checked;
      dispatch(patchTodoRequest(todo));
    },
    [todo, dispatch]
  );

  return (
    <TodoItemStyle>
      <input
        className="complete"
        type="checkbox"
        defaultChecked={todo.complete}
        onChange={onChangeComplete}
      />
      <span className="title">{todo.title}</span>
      <div className="content">{todo.contents}</div>
      <div>
        <div className={`priority priority-${todo.priority}`}></div>
        <div className="deadline">
          {new Date(todo.deadline).toISOString().substring(0, 10)}
        </div>
      </div>
      <div className="button-group">
        <button onClick={onEditTodo}>
          <Pencil />
        </button>
        <button onClick={onDeleteTodo}>X</button>
      </div>
    </TodoItemStyle>
  );
});

const TodoItemStyle = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px;
  box-shadow: 1px 1px 3px #b9b9b9;
  margin-top: 7px;
  height: 50px;
  align-items: center;
  position: relative;
  .button-group {
    display: flex;
    button {
      background: none;
      border: 0px;
    }
    position: absolute;
    top: 0px;
    right: 5px;
  }
  .title {
    padding-left: 10px;
    font-size: 18px;
    flex: 0 120px;
    overflow: hidden;
    white-space: nowrap;
  }
  .content {
    font-size: 14px;
    flex: 1;
    overflow: hidden;
    word-break: break-all;
    padding-left: 10px;
  }
  .complete {
    width: 30px;
    height: 30px;
  }
  .priority {
    font-size: 12px;
    color: #fff;
    text-align: center;
    position: relative;
    &.priority-1 {
      background: green;
      ::after {
        content: "낮음";
      }
    }
    &.priority-2 {
      background: orange;

      ::after {
        content: "보통";
      }
    }
    &.priority-3 {
      background: red;

      ::after {
        content: "중요";
      }
    }
  }
  .deadline {
    font-size: 11px;
  }
`;

export default TodoItem;
