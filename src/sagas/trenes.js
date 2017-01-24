import {put, call, takeEvery, select} from 'redux-saga/effects'

import {fetchTrenes} from '../actions/api'
import randomString from '../utils/randomString'
import mockResponse from '../utils/mockResponse'

export function* fetchTrenesApi () {
  const {preferences} = yield select()
  const {ramal} = preferences
  return yield fetch(`https://trenes.sofse.gob.ar/v2_pg/mapas/ajax_posiciones.php?ramal=${ramal.ramid}&rnd=${randomString()}&key=v%23v%23QTUNWp%23MpWR0wkj%23RhHTqVUM`)
    .then(response => response.text())
    .then(response => ({response: JSON.parse(response)}))
    .catch(error => ({error}))
}

export function* fetchTrenesSaga (): void {
  yield put(fetchTrenes.start())
  const response = yield call(mockResponse, 'trenes')
  /* const {response, error} = yield call(fetchTrenesApi)
  if (error) return yield put(fetchTrenes.failure('Hubo un error obteniendo la informacion de los trenes, prueba de nuevo mas tarde')) */
  yield put(fetchTrenes.success(response))
}

export function* fetchTrenesWatcher (): void {
  yield takeEvery(fetchTrenes.type, fetchTrenesSaga)
}

export default [
  fetchTrenesWatcher
]
