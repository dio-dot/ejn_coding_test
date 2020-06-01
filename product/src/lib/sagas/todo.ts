import {
  all,
  fork,
  takeLatest,
  call,
  put,
  delay,
  // throttle,
} from "redux-saga/effects";
import {
  CREATE_TODO_REQUEST,
  createTodoSuccess,
  LOAD_TODOS_REQUEST,
  loadTodosSuccess,
  deleteTodoSuccess,
  DELETE_TODO_REQUEST,
  patchTodoSuccess,
  PATCH_TODO_REQUEST,
  REQUEST_ALERT,
  successAlert,
  requestAlert,
} from "../reducers/todo";

import axios from "axios";
axios.defaults.baseURL = "http://localhost:3001";
/**CreateTODO */
function createTodoAPI(data) {
  return axios.post("/todos", data);
}

function* createTodo(action) {
  try {
    const result = yield call(createTodoAPI, action.payload);
    yield delay(1000);
    yield put(createTodoSuccess(result.data));
  } catch (error) {
    yield put(requestAlert(error.message));
  }
}

function* watchCreateTodo() {
  yield takeLatest(CREATE_TODO_REQUEST, createTodo);
}
/**DeleteTODO */
function deleteTodoAPI(data) {
  return axios.delete(`/todos/${data}`);
}

function* deleteTodo(action) {
  try {
    yield call(deleteTodoAPI, action.payload);
    yield put(deleteTodoSuccess(action.payload));
  } catch (error) {
    yield put(requestAlert(error.message));
  }
}

function* watchDeleteTodo() {
  yield takeLatest(DELETE_TODO_REQUEST, deleteTodo);
}

/**LoadTODOS */
function loadTodosAPI(data) {
  console.log(data);
  let complete = "";
  let priority = "";
  let deadline = "_sort=id&_order=desc";
  if (data.filter.complete === 1) {
    complete = "&complete=false";
  } else if (data.filter.complete === 2) {
    complete = "&complete=true";
  }
  if (data.filter.priority !== 0) {
    priority = `&priority=${data.filter.priority - 1}`;
  }
  if (data.filter.deadline === 1) {
    deadline = "_sort=deadline&_order=asc";
  } else if (data.filter.deadline === 2) {
    deadline = "_sort=deadline&_order=desc";
  }
  return axios.get(
    `/todos?${deadline}&_start=${data.start}&_limit=20${complete}${priority}`
  );
}

function* loadTodos(action) {
  try {
    const result = yield call(loadTodosAPI, action.payload);
    yield put(loadTodosSuccess(result.data));
  } catch (error) {
    yield put(requestAlert(error.message));
  }
}

function* watchLoadTodos() {
  // yield throttle(1000, LOAD_TODOS_REQUEST, loadTodos);
  yield takeLatest(LOAD_TODOS_REQUEST, loadTodos);
}
/**PatchTODOS */
function patchTodoAPI(data) {
  return axios.patch(`/todos/${data.id}`, data);
}

function* patchTodo(action) {
  try {
    const result = yield call(patchTodoAPI, action.payload);
    console.log(result.data);
    yield put(patchTodoSuccess(result.data));
  } catch (error) {
    yield put(requestAlert(error.message));
  }
}

function* watchPatchTodo() {
  yield takeLatest(PATCH_TODO_REQUEST, patchTodo);
}
/* alert */
function* alert(action) {
  yield delay(2000);
  yield put(successAlert());
}

function* watchAlert() {
  yield takeLatest(REQUEST_ALERT, alert);
}

export default function* todoSaga() {
  yield all([
    fork(watchCreateTodo),
    fork(watchLoadTodos),
    fork(watchDeleteTodo),
    fork(watchPatchTodo),
    fork(watchAlert),
  ]);
}
