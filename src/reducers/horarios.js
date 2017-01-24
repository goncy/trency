// @flow

import {fetchHorarios} from '../actions/api'

type HorarioType = {
  nombre: string,
  minutos_1: string,
  minutos_2: string,
  minutos_3: string,
  minutos_4: string
}

type ShapedHorarioType = {
  name: string,
  primero: string,
  segundo: string
}

type HorariosAction = {
  type: string,
  payload: HorarioType
}

type HorariosState = {
  activo: ?ShapedHorarioType,
  status: string
}

const horarios = (
  state: HorariosState = {
    activo: null,
    error: false,
    status: 'init'
  },
  {type, payload}: HorariosAction): HorariosState => {
  switch (type) {
    case fetchHorarios.SUCCESS:
      return {
        ...state,
        status: 'success',
        error: false,
        activo: {
          name: payload.nombre,
          horarios: [
            {
              primero: payload.minutos_1,
              segundo: payload.minutos_2
            },
            {
              primero: payload.minutos_3,
              segundo: payload.minutos_4
            }
          ]
        }
      }
    case fetchHorarios.FAILURE:
      return {
        ...state,
        status: 'failure',
        error: true
      }
    case fetchHorarios.START:
      return {
        ...state,
        status: 'pending'
      }
    default:
      return state
  }
}

export default horarios
