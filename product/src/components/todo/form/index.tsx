import React, { useState, useCallback, ChangeEvent, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../lib/reducers";
import {
  TODO,
  requestAlert,
  createTodoRequest,
  patchTodoRequest,
} from "../../../lib/reducers/todo";
import { Radio } from "../../etc/Radio";
import Loading from "../../etc/Loading";

const date = new Date().toISOString().substr(0, 10);

interface Props {}

const Form: React.FC<Props> = () => {
  const [todo, setTodo] = useState<TODO>({
    title: "",
    contents: "",
    deadline: date,
    priority: "0",
  });
  const { creatingTodo, createdTodo, editTodo } = useSelector(
    (state: RootState) => state.todo
  );
  const dispatch = useDispatch();

  const onTodoChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setTodo({ ...todo, [e.target.name]: e.target.value });
    },
    [todo]
  );
  const onTodoCreate = useCallback(() => {
    let alert = Object.keys(todo).filter((key) => {
      if (todo[key] === "") {
        return true;
      } else {
        return false;
      }
    });
    if (alert.length > 0) {
      dispatch(requestAlert(`${alert.join(",")}을 입력하세요`));
    } else {
      dispatch(
        createTodoRequest({
          ...todo,
          complete: false,
          deadline: new Date(todo.deadline).getTime(),
        })
      );
    }
  }, [todo, dispatch]);
  const onTodoEdit = useCallback(() => {
    let alert = Object.keys(todo).filter((key) => {
      if (todo[key] === "") {
        return true;
      } else {
        return false;
      }
    });
    if (alert.length > 0) {
      dispatch(requestAlert(`${alert.join(",")}을 입력하세요`));
    } else {
      if (editTodo) {
        dispatch(
          patchTodoRequest({
            ...todo,
            id: editTodo.id,
            deadline: new Date(todo.deadline).getTime(),
          })
        );
      }
    }
  }, [editTodo, todo, dispatch]);

  useEffect(() => {
    if (editTodo !== null) {
      setTodo({
        title: editTodo.title,
        contents: editTodo.contents,
        deadline: new Date(editTodo.deadline).toISOString().substr(0, 10),
        priority: editTodo.priority,
      });
    } else {
      setTodo({
        title: "",
        contents: "",
        deadline: date,
        priority: "0",
      });
    }
  }, [editTodo]);

  useEffect(() => {
    if (createdTodo) {
      setTodo({
        title: "",
        contents: "",
        deadline: date,
        priority: "0",
      });
    }
  }, [createdTodo]);
  return (
    <FormStyle>
      <Title
        onChange={onTodoChange}
        name="title"
        maxLength={20}
        placeholder="제목을 입력해주세요! (20자)"
        value={todo.title}
      />
      <Contents
        onChange={onTodoChange}
        name="contents"
        maxLength={70}
        placeholder="무슨일을 할까요? (70자)"
        value={todo.contents}
      />
      <Row>
        <Deadline
          onChange={onTodoChange}
          name="deadline"
          type="date"
          value={todo.deadline}
          min={todo.deadline}
        />
        <Priority
          onChange={onTodoChange}
          items={["낮음", "보통", "중요"]}
          name="priority"
          value={todo.priority}
        />
        {editTodo ? (
          <Button onClick={onTodoEdit}>수정</Button>
        ) : (
          <Button onClick={onTodoCreate} disabled={creatingTodo}>
            {creatingTodo ? <Loading /> : "등록"}
          </Button>
        )}
      </Row>
    </FormStyle>
  );
};

const FormStyle = styled.div`
  display: flex;
  flex-direction: column;
`;
const Title = styled.input`
  box-shadow: inset 0 2px 2px #f7f7f7;
  border: 1px solid #e9e9e9;
  padding: 6px 10px;
  margin-top: 10px;
  cursor: pointer;
`;
const Contents = styled.textarea`
  resize: none;
  flex: 1;
  box-shadow: inset 0 2px 2px #f7f7f7;
  border: 1px solid #e9e9e9;
  padding: 6px 10px;
  margin-top: 10px;
  cursor: pointer;
`;

const Row = styled.div`
  display: flex;
  margin-top: 10px;
`;
const Deadline = styled.input`
  box-shadow: inset 0 2px 2px #f7f7f7;
  border: 1px solid #e9e9e9;
  padding: 6px 10px;
  cursor: pointer;
`;
const Priority = styled(Radio)``;
const Button = styled.button`
  width: 80px;
  background: rgb(32, 201, 151);
  border: none;
  color: #fff;
  cursor: pointer;
  margin-left: auto;
`;
export default Form;
