// @flow

import * as Immutable from 'immutable'

import {fetchTrenes} from '../actions/api'

type Position = {
  lat: number,
  lng: number
}

type TrenType = {
  formacion_id: number,
  estado_mov: number,
  estado_servicio: number,
  latitud: string,
  longitud: string,
  ramal: number
}

type ShapedTrenType = {
  id: number,
  moviendose: boolean,
  funcionando: boolean,
  posicion: Position,
  ramal: number
}

type TrenesAction = {
  type: string,
  payload: TrenType[]
}

type TrenesState = {
  list: Immutable.List<TrenType>,
  status: string
}

const trenes = (
  state: TrenesState = {
    list: Immutable.List(),
    error: false,
    status: 'init'
  },
  {type, payload}: TrenesAction): TrenesState => {
  switch (type) {
    case fetchTrenes.SUCCESS:
      return {
        ...state,
        status: 'success',
        error: false,
        list: Immutable.List(payload)
      }
    case fetchTrenes.FAILURE:
      return {
        ...state,
        error: true,
        status: 'failure'
      }
    case fetchTrenes.START:
      return {
        ...state,
        status: 'pending'
      }
    default:
      return state
  }
}

export const getTrenes = (trenes: TrenesState): Immutable.List<ShapedTrenType> => trenes
  .list
  .map((tren: TrenType): ShapedTrenType => ({
    id: tren.formacion_id,
    ramal: tren.ramal,
    moviendose: tren.estado_mov === 1,
    funcionando: tren.estado_servicio === 1,
    posicion: {lat: Number(tren.latitud), lng: Number(tren.longitud)}
  }))

export const trenesIsEmpty = (trenes: TrenesState): boolean => trenes
  .list
  .isEmpty()

export default trenes
