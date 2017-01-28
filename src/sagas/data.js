import {put, call, takeEvery, select} from 'redux-saga/effects'

import {fetchData} from '../actions/api'
import {shapeResponse} from '../selectors/data'

export function* fetchDataApi () {
  const {preferences} = yield select()
  const {branch} = preferences
  return yield fetch('http://localhost:3005/' + branch.id)
    .then(response => response.text())
    .then(response => ({response: JSON.parse(response)}))
    .catch(error => ({error}))
}

export function* fetchDataSaga (): void {
  yield put(fetchData.start())
  const {response, error} = yield call(fetchDataApi)
  if (error) {
    yield put(fetchData.failure({error}))
  } else {
    const shapedResponse = yield select(shapeResponse, response)
    yield put(fetchData.success(shapedResponse))
  }
}

export function* fetchDataWatcher (): void {
  yield takeEvery(fetchData.type, fetchDataSaga)
}

export default [
  fetchDataWatcher
]
