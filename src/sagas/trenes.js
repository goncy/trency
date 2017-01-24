import {put, call, takeEvery, select} from 'redux-saga/effects'

import {fetchTrenes} from '../actions/api'
import randomString from '../utils/randomString'

const mockedResponse = () => [{'formacion_id': 1010071, 'latitud': '-34.699753', 'longitud': '-58.306417', 'ramal': 11, 'estado_servicio': 1, 'estado_mov': 1}, {'formacion_id': 1010066, 'latitud': '-34.753459', 'longitud': '-58.230769', 'ramal': 11, 'estado_servicio': 1, 'estado_mov': 1}, {'formacion_id': 200030, 'latitud': '-34.757164', 'longitud': '-58.223019', 'ramal': 12, 'estado_servicio': 1, 'estado_mov': 1}, {'formacion_id': 1010068, 'latitud': '-34.689736', 'longitud': '-58.327795', 'ramal': 12, 'estado_servicio': 1, 'estado_mov': 1}, {'formacion_id': 1010041, 'latitud': '-34.638829', 'longitud': '-58.380551', 'ramal': 12, 'estado_servicio': 1, 'estado_mov': 1}]

const fetchError = fetchTrenes.failure('Hubo un error obteniendo la informacion de los trenes, prueba de nuevo mas tarde')

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
  const response = yield call(mockedResponse)
  // const {response, error} = yield call(fetchTrenesApi)
  // if (error) return yield put(fetchError)
  yield put(fetchTrenes.success(response))
}

export function* fetchTrenesWatcher (): void {
  yield takeEvery(fetchTrenes.type, fetchTrenesSaga)
}

export default [
  fetchTrenesWatcher
]
