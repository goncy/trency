import * as types from '../types'
import {makeAction} from '../utils/makeActionCreator'

export const changeLine = makeAction(types.CHANGE_LINEA)
export const changeBranch = makeAction(types.CHANGE_RAMAL)
export const changeStation = makeAction(types.CHANGE_ESTACION)
export const preferencesReady = makeAction(types.PREFERENCES_READY)
export const clearPreferences = makeAction(types.CLEAR_PREFERENCES)
export const preferencesChanged = makeAction(types.PREFERENCES_CHANGED)
