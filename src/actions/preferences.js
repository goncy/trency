import * as types from '../types'
import {makeAction} from '../utils/makeActionCreator'

export const changeLinea = makeAction(types.CHANGE_LINEA)
export const changeRamal = makeAction(types.CHANGE_RAMAL)
export const changeEstacion = makeAction(types.CHANGE_ESTACION)
export const clearPreferences = makeAction(types.CLEAR_PREFERENCES)
