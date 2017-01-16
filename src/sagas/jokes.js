import {put, call, takeEvery} from 'redux-saga/effects'

import {fetchJoke} from '../actions/api'

export function fetchJokeApi() {
  return fetch('https://api.chucknorris.io/jokes/random')
    .then(response => response.json())
}

export function* fetchJokeSaga (): void {
  const joke = yield call(fetchJokeApi)
  yield put(fetchJoke.success(joke))
}

export function* fetchJokeWatcher (): void {
  yield takeEvery(fetchJoke.type, fetchJokeSaga)
}

export default [
  fetchJokeWatcher
]