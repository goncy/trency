import {put, call, takeEvery, select} from 'redux-saga/effects'

import {fetchData} from '../actions/api'

export function* fetchDataApi () {
  const {preferences} = yield select()
  const {branch} = preferences
  return yield fetch('https://trenesargentinosapi.herokuapp.com/' + branch.id)
    .then(response => response.json())
    .then(response => response)
    .catch(error => ({error}))
}

export function* fetchDataSaga () {
  yield put(fetchData.start())
  const {response, error} = yield call(fetchDataApi)
  if (error) {
    yield put(fetchData.failure({error}))
  } else {
    yield put(fetchData.success(response))
  }
}

export function* fetchDataWatcher () {
  yield takeEvery(fetchData.type, fetchDataSaga)
}

export default [
  fetchDataWatcher
]
