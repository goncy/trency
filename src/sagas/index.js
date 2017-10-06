import { fork } from "redux-saga/effects"

import data from "./data"
import preferences from "./preferences"

function startSagas(...sagas) {
  return function* rootSaga() {
    yield sagas.map(saga => fork(saga))
  }
}

export default startSagas(...data, ...preferences)
