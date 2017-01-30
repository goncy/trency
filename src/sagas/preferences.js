import {select, take, put} from 'redux-saga/effects'

import {changeStation, changeLine, changeBranch, clearPreferences, preferencesReady, preferencesChanged} from '../actions/preferences'
import {preferencesSet} from '../reducers/preferences'

export function* preferencesChangeWatcher () {
  const changeActions = take([changeStation.type, changeLine.type, changeBranch.type, clearPreferences.type])
  while (yield changeActions) {
    yield put(preferencesChanged.run())
    const {preferences} = yield select()
    if (preferencesSet(preferences)) {
      yield put(preferencesReady.run())
    }
  }
}

export default [
  preferencesChangeWatcher
]
