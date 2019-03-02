import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";

import rootReducer from "./reducers";

const persistConfig = {
  key: "root",
  storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const loggerMiddleware = createLogger();
const reduxMiddlewares = [thunk, loggerMiddleware];

const configureStore = () => {
  const store = createStore(
    persistedReducer,
    applyMiddleware.apply(undefined, reduxMiddlewares)
  );
  persistStore(store);
  return store;
};

export default configureStore;
