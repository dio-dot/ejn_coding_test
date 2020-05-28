import { createStore, applyMiddleware } from "redux";
import createSagaMiddleWare from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension";
import RootReducer from "../reducers";
import RootSaga from "../sagas";
const store = (() => {
  const sagaMiddleWare = createSagaMiddleWare();
  const middleware = [sagaMiddleWare];
  const composeEnhancers = composeWithDevTools({});
  const store = createStore(
    RootReducer,
    composeEnhancers(applyMiddleware(...middleware))
  );
  //@ts-ignore
  store.sagaTask = sagaMiddleWare.run(RootSaga);
  return store;
})();

export { store };
