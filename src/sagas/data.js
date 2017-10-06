import {
  put,
  call,
  takeEvery,
  select,
  take,
  race,
  fork
} from "redux-saga/effects"
import { delay } from "redux-saga"

import { fetchData, clearData, stopFetch, startFetch } from "../actions/api"
import { idleChanged } from "../actions/user"
import { preferencesChanged, preferencesReady } from "../actions/preferences"
import {
  FAILURE_FETCH_TIME,
  SUCCESS_FETCH_TIME,
  API_URL,
  IDLE_TIME
} from "../constants"
import { shapeResponse } from "../selectors/data"
import { preferencesSet } from "../selectors/preferences"

function* fetchDataApi() {
  const { preferences } = yield select()
  const { branch } = preferences
  return yield fetch(API_URL + branch.id)
    .then(response => response.json())
    .then(response => response)
    .catch(error => ({ error }))
}

function* fetchDataSaga() {
  yield put(fetchData.start())
  const { response, error } = yield call(fetchDataApi)
  if (error) {
    yield put(fetchData.failure({ error }))
  } else if (response) {
    const shapedResponse = yield select(shapeResponse, response)
    yield put(fetchData.success(shapedResponse))
  }
}

function* fetchDataLoop(time) {
  while (true) {
    yield call(delay, time)
    yield put(fetchData.run())
  }
}

function* fetchTimeout(timeout) {
  yield call(delay, timeout)
  yield put(idleChanged.run(true))
}

function* startFetchWorker() {
  yield fork(fetchTimeout, IDLE_TIME)
  while (true) {
    yield put(fetchData.run())
    const fetchResult = yield take([fetchData.SUCCESS, fetchData.FAILURE])
    if (fetchResult.type === fetchData.SUCCESS) {
      yield race({
        task: call(fetchDataLoop, SUCCESS_FETCH_TIME),
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

function* preferencesReadyWorker() {
  yield put(startFetch.run())
}

function* idleWorker({ payload }) {
  if (payload) {
    yield put(stopFetch.run())
  } else {
    yield put(startFetch.run())
  }
}

function* preferencesChangedWorker() {
  yield put(stopFetch.run())
  yield put(clearData.run())
}

function* fetchDataWatcher() {
  yield takeEvery(fetchData.type, fetchDataSaga)
}

function* preferencesReadyWatcher() {
  yield takeEvery(preferencesReady.type, preferencesReadyWorker)
}

function* preferencesChangedWatcher() {
  yield takeEvery(preferencesChanged.type, preferencesChangedWorker)
}

function* idleWatcher() {
  yield takeEvery(idleChanged.type, idleWorker)
}

function* startFetchWatcher() {
  while (yield take(startFetch.type)) {
    const { preferences } = yield select()
    if (preferencesSet(preferences)) {
      yield race({
        task: call(startFetchWorker),
        cancel: take(stopFetch.type)
      })
    }
  }
}

export default [
  fetchDataWatcher,
  preferencesChangedWatcher,
  preferencesReadyWatcher,
  startFetchWatcher,
  idleWatcher
]
