// @flow
import type {DataState} from './data'
import type {PreferencesState} from './preferences'

export type AppState = {
  data: DataState,
  preferences: PreferencesState
}

export type GMaps = any
