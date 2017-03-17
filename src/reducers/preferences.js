// @flow
import {changeStation, changeLine, changeBranch, clearPreferences} from '../actions/preferences'

import type {PreferencesState} from '../flowtypes/preferences'

type PreferencesAction = {
  type: string,
  payload: any
}

const preferences = (
  state: PreferencesState = {
    line: null,
    branch: null,
    station: null
  },
  {type, payload}: PreferencesAction): PreferencesState => {
  switch (type) {
    case changeLine.SUCCESS:
      return {
        ...state,
        branch: null,
        station: null,
        line: payload
      }
    case changeBranch.SUCCESS:
      return {
        ...state,
        station: null,
        branch: payload
      }
    case changeStation.SUCCESS:
      return {
        ...state,
        station: payload
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
