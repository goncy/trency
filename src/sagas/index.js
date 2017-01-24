import {fork} from 'redux-saga/effects'

import trenes from './trenes'
import horarios from './horarios'
import preferences from './preferences'


function startSagas (...sagas) {
  return function * rootSaga () {
    yield sagas.map(saga => fork(saga))
  }
}

export default startSagas(
  ...trenes,
  ...horarios,
  ...preferences
)
