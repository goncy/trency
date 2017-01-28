import * as types from '../types'
import {makeAction} from '../utils/makeActionCreator'

export const changeLine = makeAction(types.CHANGE_LINEA)
export const changeBranch = makeAction(types.CHANGE_RAMAL)
export const changeStation = makeAction(types.CHANGE_ESTACION)
export const clearPreferences = makeAction(types.CLEAR_PREFERENCES)
