import {put, call, takeEvery, select, take, race} from 'redux-saga/effects'
import {delay} from 'redux-saga'

import {fetchData} from '../actions/api'
import {preferencesReady, preferencesChanged} from '../actions/preferences'

export function* fetchDataApi () {
  const {preferences} = yield select()
  const {branch} = preferences
  return yield fetch('https://trenesargentinosapi.herokuapp.com/' + branch.id)
    .then(response => response.json())
    .then(response => response)
    .catch(error => ({error}))
}

export function* fetchDataLoop (time = 10000) {
  while (true) {
    yield call(delay, time)
    yield call(fetchDataSaga)
  }
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

export function* preferencesReadyWorker (): void {
  while (true) {
    yield call(fetchDataSaga)
    const fetchResult = yield take([fetchData.SUCCESS, fetchData.FAILURE])
    if (fetchResult.type === fetchData.SUCCESS) {
      yield race({
        task: call(fetchDataLoop),
        cancel: take(fetchData.FAILURE)
      })
    }
    if (fetchResult.type === fetchData.FAILURE) {
      yield race({
        task: call(fetchDataLoop, 3000),
        cancel: take(fetchData.SUCCESS)
      })
    }
  }
}

export function* fetchDataWatcher () {
  yield takeEvery(fetchData.type, fetchDataSaga)
}

export function* preferencesReadyWatcher (): void {
  while (yield take(preferencesReady.type)) {
    yield race({
      task: call(preferencesReadyWorker),
      cancel: take(preferencesChanged.type)
    })
  }
}

export default [
  fetchDataWatcher,
  preferencesReadyWatcher
]
