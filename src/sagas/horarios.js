import {put, call, takeEvery, select} from 'redux-saga/effects'

import {fetchHorarios} from '../actions/api'
import randomString from '../utils/randomString'
import {getEstacionIndex} from '../selectors'

const mockedResponse = () => [{'nombre': 'Constituci\u00f3n', 'minutos_1': '0', 'minutos_2': '12', 'minutos_3': '-1', 'minutos_4': '-1'}, {'nombre': 'Santill\u00e1n y Kosteki', 'minutos_1': '7', 'minutos_2': '19', 'minutos_3': '-1', 'minutos_4': '-1'}, {'nombre': 'Sarand\u00ed', 'minutos_1': '12', 'minutos_2': '24', 'minutos_3': '-1', 'minutos_4': '-1'}, {'nombre': 'Villa Dom\u00ednico', 'minutos_1': '17', 'minutos_2': '29', 'minutos_3': '-1', 'minutos_4': '-1'}, {'nombre': 'Wilde', 'minutos_1': '20', 'minutos_2': '32', 'minutos_3': '-1', 'minutos_4': '-1'}, {'nombre': 'Don Bosco', 'minutos_1': '23', 'minutos_2': '35', 'minutos_3': '-1', 'minutos_4': '-1'}, {'nombre': 'Bernal', 'minutos_1': '1', 'minutos_2': '27', 'minutos_3': '-1', 'minutos_4': '-1'}, {'nombre': 'Quilmes', 'minutos_1': '6', 'minutos_2': '31', 'minutos_3': '-1', 'minutos_4': '-1'}, {'nombre': 'Ezpeleta', 'minutos_1': '11', 'minutos_2': '37', 'minutos_3': '-1', 'minutos_4': '-1'}, {'nombre': 'Berazategui', 'minutos_1': '16', 'minutos_2': '41', 'minutos_3': '-1', 'minutos_4': '-1'}, {'nombre': 'Pl\u00e1tanos', 'minutos_1': '76', 'minutos_2': '-1', 'minutos_3': '-1', 'minutos_4': '-1'}, {'nombre': 'Hudson', 'minutos_1': '80', 'minutos_2': '-1', 'minutos_3': '-1', 'minutos_4': '-1'}, {'nombre': 'Pereyra', 'minutos_1': '88', 'minutos_2': '-1', 'minutos_3': '-1', 'minutos_4': '-1'}, {'nombre': 'Villa Elisa', 'minutos_1': '92', 'minutos_2': '-1', 'minutos_3': '-1', 'minutos_4': '-1'}, {'nombre': 'City Bell', 'minutos_1': '97', 'minutos_2': '-1', 'minutos_3': '-1', 'minutos_4': '-1'}, {'nombre': 'Gonnet', 'minutos_1': '-1', 'minutos_2': '-1', 'minutos_3': '-1', 'minutos_4': '-1'}, {'nombre': 'Ringuelet', 'minutos_1': '-1', 'minutos_2': '-1', 'minutos_3': '-1', 'minutos_4': '-1'}, {'nombre': 'Tolosa', 'minutos_1': '-1', 'minutos_2': '-1', 'minutos_3': '-1', 'minutos_4': '-1'}, {'nombre': 'La Plata', 'minutos_1': '-1', 'minutos_2': '-1', 'minutos_3': '-1', 'minutos_4': '-1'}]

const fetchError = fetchHorarios.failure('Hubo un error obteniendo los horarios de los trenes, prueba de nuevo mas tarde')

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
  const response = yield call(mockedResponse)
  // const {response, error} = yield call(fetchHorariosApi)
  // if (error) return yield put(fetchError)
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
