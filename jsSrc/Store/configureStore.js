import {createStore, applyMiddleware} from 'redux';
import rootReducer from '../Redusers';
import {createLogger} from 'redux-logger';

export default function configureStore(initialState) {
  const logger = createLogger();
  const store = createStore(
    rootReducer,
    initialState,
    // applyMiddleware(logger)
  );
  return store;
}