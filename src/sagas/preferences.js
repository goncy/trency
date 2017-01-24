import {select, race, take, call, put} from 'redux-saga/effects'
import {delay} from 'redux-saga'

import {changeEstacion, changeLinea, changeRamal, clearPreferences} from '../actions/preferences'
import {fetchTrenes, fetchHorarios} from '../actions/api'
import {preferencesSet} from '../reducers/preferences'

export function* fetchLoop () {
  while (true) {
    yield put(fetchTrenes.run())
    yield put(fetchHorarios.run())
    yield call(delay, 15000)
  }
}

export function* preferencesChangeWatcher (): void {
  const changeActions = take([changeEstacion.type, changeLinea.type, changeRamal.type, clearPreferences.type])
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
