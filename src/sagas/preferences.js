import {select, race, take, call, put} from 'redux-saga/effects'
import {delay} from 'redux-saga'

import {changeStation, changeLine, changeBranch, clearPreferences} from '../actions/preferences'
import {fetchData} from '../actions/api'
import {preferencesSet} from '../reducers/preferences'

export function* fetchLoop () {
  while (true) {
    yield put(fetchData.run())
    yield call(delay, 10000)
  }
}

export function* preferencesChangeWatcher (): void {
  const changeActions = take([changeStation.type, changeLine.type, changeBranch.type, clearPreferences.type])
  while (yield changeActions) {
    const {preferences} = yield select()
    if (preferencesSet(preferences)) {
      yield race({
        task: call(fetchLoop),
        cancel: changeActions
      })
    }
  }
}

export default [
  preferencesChangeWatcher
]
