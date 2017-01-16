import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers';
import createSagaMiddleware from 'redux-saga'
import sagaMonitor from '../utils/sagaMonitor'

export default function configureStore() {
  const sagaMiddleware = createSagaMiddleware({sagaMonitor})
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  return {
    ...createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleware))),
    runSaga: sagaMiddleware.run
  }
}
