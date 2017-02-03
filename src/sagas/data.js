import {put, call, takeEvery, select, take, race} from 'redux-saga/effects'
import {delay} from 'redux-saga'

import {fetchData, clearData} from '../actions/api'
import {preferencesReady, preferencesChanged, clearPreferences} from '../actions/preferences'
import {FAILURE_FETCH_TIME, SUCCESS_FETCH_TIME, API_URL} from '../constants'
import {shapeResponse} from '../selectors/data'

export function* fetchDataApi () {
  const {preferences} = yield select()
  const {branch} = preferences
  return yield fetch(API_URL + branch.id)
    .then(response => response.json())
    .then(response => response)
    .catch(error => ({error}))
}

export function* fetchDataSaga () {
  yield put(fetchData.start())
  const {response, error} = yield call(fetchDataApi)
  if (error) {
    yield put(fetchData.failure({error}))
  } else if (response) {
    const shapedResponse = yield select(shapeResponse, response)
    yield put(fetchData.success(shapedResponse))
  }
}

export function* fetchDataLoop (time = SUCCESS_FETCH_TIME) {
  while (true) {
    yield call(delay, time)
    yield put(fetchData.run())
  }
}

export function* preferencesReadyWorker () {
  while (true) {
    yield put(fetchData.run())
    const fetchResult = yield take([fetchData.SUCCESS, fetchData.FAILURE])
    if (fetchResult.type === fetchData.SUCCESS) {
      yield race({
        task: call(fetchDataLoop),
        cancel: take(fetchData.FAILURE)
      })
      yield call(delay, FAILURE_FETCH_TIME)
    }
    if (fetchResult.type === fetchData.FAILURE) {
      yield race({
        task: call(fetchDataLoop, FAILURE_FETCH_TIME),
        cancel: take(fetchData.SUCCESS)
      })
      yield call(delay, SUCCESS_FETCH_TIME)
    }
  }
}

export function* clearDataWorker () {
  yield put(clearData.run())
}

export function* fetchDataWatcher () {
  yield takeEvery(fetchData.type, fetchDataSaga)
}

export function* clearDataWatcher () {
  yield takeEvery(clearPreferences.type, clearDataWorker)
}

export function* preferencesReadyWatcher () {
  while (yield take(preferencesReady.type)) {
    yield race({
      task: call(preferencesReadyWorker),
      cancel: take(preferencesChanged.type)
    })
  }
}

export default [
  fetchDataWatcher,
  clearDataWatcher,
  preferencesReadyWatcher
]
