import { combineReducers } from "redux";
import todo from "./todo";

const RootReducer = combineReducers({
  todo,
});

export type RootState = ReturnType<typeof RootReducer>;
export default RootReducer;
