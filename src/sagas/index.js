import {fork} from 'redux-saga/effects'

import jokes from './jokes'

export default function* rootSaga () {
  yield [
    fork(...jokes)
  ]
}