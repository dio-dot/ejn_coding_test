import React, {
  useCallback,
  FormEvent,
  useState,
  ChangeEvent,
  useEffect,
} from "react";
import styled from "styled-components";
import Loading from "./etc/Loading";
import {
  createTodoRequest,
  requestAlert,
  patchTodoRequest,
  setEditTodo,
} from "../lib/reducers/todo";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../lib/reducers";
import { Content, Input, Priority } from "./todo/form";

const date = new Date().toISOString().substr(0, 10);
interface Props {}

const TodoForm: React.FC<Props> = () => {
  const [title, setTitle] = useState<string>("");
  const [contents, setContent] = useState<string>("");
  const [deadline, setDeadline] = useState<string>(date);
  const [priority, setPriority] = useState<number>(1);
  const dispatch = useDispatch();
  const { creatingTodo, createdTodo, editTodo } = useSelector(
    (state: RootState) => state.todo
  );
  /** Effect Hooks */
  useEffect(() => {
    if (editTodo) {
      setTitle(editTodo.title);
      setContent(editTodo.contents);
      setDeadline(new Date(editTodo.deadline).toISOString().substr(0, 10));
      setPriority(Number(editTodo.priority));
    }
  }, [editTodo]);
  useEffect(() => {
    if (createdTodo) {
      setTitle("");
      setContent("");
      setDeadline(date);
      setPriority(1);
    }
  }, [createdTodo]);

  /** Dipatch Event Handler */
  const onCreateTodo = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (title === "") {
        dispatch(requestAlert("제목을 입력하세요"));
      } else {
        dispatch(
          createTodoRequest({
            complete: false,
            title,
            contents,
            deadline: new Date(deadline).getTime(),
            priority,
          })
        );
      }
    },
    [priority, title, contents, deadline, dispatch]
  );
  const onEditTodo = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (title === "") {
        dispatch(requestAlert("제목을 입력하세요"));
      } else {
        if (editTodo) {
          dispatch(
            patchTodoRequest({
              id: editTodo.id,
              title: title,
              priority: priority,
              contents: contents,
              deadline: new Date(deadline).getTime(),
            })
          );
        }
      }
    },
    [editTodo, priority, title, contents, deadline, dispatch]
  );
  const onCancelEditTodo = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setTitle("");
      setContent("");
      setDeadline(date);
      setPriority(1);
      dispatch(setEditTodo(null));
    },
    [dispatch]
  );

  /** Event Handler */
  const onChangeTitle = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  }, []);
  const onChangeContent = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  }, []);
  const onChangeDate = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setDeadline(e.target.value);
  }, []);
  const onChangePriority = useCallback((e: ChangeEvent<HTMLDivElement>) => {
    const value = Number((e.target as HTMLInputElement).value);
    setPriority(value);
  }, []);
  return (
    <Form>
      <Row>
        <Input
          onChange={onChangeTitle}
          value={title}
          flex="1"
          maxLength={20}
          placeholder="제목을 입력해주세요! (20자)"
        />
      </Row>
      <Row>
        <Content
          maxLength={70}
          onChange={onChangeContent}
          value={contents}
          placeholder="무슨일을 할까요? (70자)"
        />
      </Row>
      <Row>
        <Input
          flex="0 150px"
          type="date"
          min={deadline}
          value={deadline}
          onChange={onChangeDate}
        />
        <Priority
          priorityText={["낮음", "보통", "중요"]}
          onChangePriority={onChangePriority}
          priority={priority}
          name="priority"
        />
        {editTodo ? (
          <>
            <Button margin onClick={onEditTodo}>
              수정
            </Button>
            <Button onClick={onCancelEditTodo}>마치기</Button>
          </>
        ) : (
          <Button margin disabled={creatingTodo} onClick={onCreateTodo}>
            {creatingTodo ? <Loading /> : "등록"}
          </Button>
        )}
      </Row>
    </Form>
  );
};

const Form = styled.form``;

const Row = styled.div`
  display: flex;
  padding-top: 10px;
`;

const Button = styled.button`
  width: 80px;
  ${(props) => (props.margin ? "margin-left: auto;" : "")}
  background: rgb(32, 201, 151);
  border: none;
  color: #fff;
  cursor: pointer;
`;

export default TodoForm;
