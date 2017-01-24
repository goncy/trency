// @flow
import {changeEstacion, changeLinea, changeRamal, clearPreferences} from '../actions/preferences'
import {getLinea, getRamal, getEstacion} from '../selectors'

type PreferencesState = {
  linea: ?any,
  ramal: ?any,
  estacion: ?string
}

type PreferencesAction = {
  type: string,
  payload: string
}

const preferences = (state: PreferencesState = {
  linea: null,
  ramal: null,
  estacion: null
}, {type, payload}: PreferencesAction): PreferencesState => {
  switch (type) {
    case changeLinea.type:
      return {
        ...state,
        ramal: null,
        estacion: null,
        linea: getLinea(payload)
      }
    case changeRamal.type:
      return {
        ...state,
        estacion: null,
        ramal: getRamal(state.linea, payload)
      }
    case changeEstacion.type:
      return {
        ...state,
        estacion: getEstacion(state.ramal, payload)
      }
    case clearPreferences.type:
      return {
        ...state,
        linea: null,
        ramal: null,
        estacion: null
      }
    default:
      return state
  }
}

export const preferencesSet = ({linea, ramal, estacion}: PreferencesState): boolean => Boolean(linea && ramal && estacion)

export default preferences
