// @flow
import {changeStation, changeLine, changeBranch, clearPreferences} from '../actions/preferences'
import {getLine, getBranch, getStation} from '../selectors/constants'

import type {PreferencesState} from '../flowtypes/preferences'

type PreferencesAction = {
  type: string,
  payload: string
}

const preferences = (
  state: PreferencesState = {
    line: null,
    branch: null,
    station: null
  },
  {type, payload}: PreferencesAction): PreferencesState => {
  switch (type) {
    case changeLine.type:
      return {
        ...state,
        branch: null,
        station: null,
        line: getLine(payload)
      }
    case changeBranch.type:
      return {
        ...state,
        station: null,
        branch: getBranch(state.line, payload)
      }
    case changeStation.type:
      return {
        ...state,
        station: getStation(state.branch, payload)
      }
    case clearPreferences.type:
      return {
        ...state,
        line: null,
        branch: null,
        station: null
      }
    default:
      return state
  }
}

export default preferences
