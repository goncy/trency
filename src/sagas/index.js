import {fork} from 'redux-saga/effects'

import people from './people'

export default function* rootSaga () {
  yield [
    fork(...people)
  ]
}