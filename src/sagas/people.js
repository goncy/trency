import {put, call, takeEvery} from 'redux-saga/effects'
import {delay} from 'redux-saga'

import {fetchPerson} from '../actions/api'

export function fetchPersonApi(id) {
  return fetch(`https://swapi.co/api/people/${id}` )
    .then(response => response.json())
}

export function* fetchPersonSaga ({payload: id}: number): void {
  const people = yield call(fetchPersonApi, id)
  yield call (delay, id * 500)  
  yield put(fetchPerson.success({...people, id}))
}

export function* fetchPersonWatcher (): void {
  yield takeEvery(fetchPerson.type, fetchPersonSaga)
}

export default [
  fetchPersonWatcher
]