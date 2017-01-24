import {put, call, takeEvery, select} from 'redux-saga/effects'

import {fetchHorarios} from '../actions/api'
import {getEstacionIndex} from '../selectors'
import randomString from '../utils/randomString'
import mockResponse from '../utils/mockResponse'

export function* fetchHorariosApi () {
  const {preferences} = yield select()
  const {ramal} = preferences
  return yield fetch(`https://trenes.sofse.gob.ar/v2_pg/arribos/ajax_arribos.php?ramal=${ramal.ramid}&rnd=${randomString()}&key=v%23v%23QTUNWp%23MpWR0wkj%23RhHTqVUM`)
    .then(response => response.text())
    .then(response => ({response: JSON.parse(response)}))
    .catch(error => ({error}))
}

export function* fetchHorariosSaga (): void {
  yield put(fetchHorarios.start())
  const response = yield call(mockResponse, 'horarios')
  /* const {response, error} = yield call(fetchHorariosApi)
  if (error) return yield put(fetchHorarios.failure('Hubo un error obteniendo los horarios de los trenes, prueba de nuevo mas tarde')) */
  const {preferences} = yield select()
  const horarioActivo = response[getEstacionIndex(preferences.ramal, preferences.estacion.id)]
  yield put(fetchHorarios.success(horarioActivo))
}

export function* fetchHorariosWatcher (): void {
  yield takeEvery(fetchHorarios.type, fetchHorariosSaga)
}

export default [
  fetchHorariosWatcher
]
