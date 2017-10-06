import * as types from "../types"
import { makeAction } from "../utils/makeActionCreator"

export const changeLine = makeAction(types.CHANGE_LINE)
export const changeBranch = makeAction(types.CHANGE_BRANCH)
export const changeStation = makeAction(types.CHANGE_STATION)
export const preferencesReady = makeAction(types.PREFERENCES_READY)
export const clearPreferences = makeAction(types.CLEAR_PREFERENCES)
export const preferencesChanged = makeAction(types.PREFERENCES_CHANGED)
export const preferencesNoMatch = makeAction(types.PREFERENCES_NO_MATCH)
