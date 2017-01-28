// @flow

import {List} from 'immutable'
import {getStationIndex} from '../selectors'

import type {RawArrival, RawPosition, Arrival, Position, DataState, DataResponse} from '../flowtypes/data'
import type {PreferencesState} from '../flowtypes/preferences'

export const shapeArrivals = (arrival: RawArrival): Arrival => ({
  station: arrival.nombre,
  arrivals: [
    {
      primero: arrival.minutos_1,
      segundo: arrival.minutos_2
    },
    {
      primero: arrival.minutos_3,
      segundo: arrival.minutos_4
    }
  ]
})

export const getActiveArrival = (arrivals: RawArrival[], {branch, station}: PreferencesState): RawArrival =>
  arrivals[getStationIndex(branch, station.id)]

export const shapePositions = (positions: RawPosition[]): List<Position> => List(
  positions.map(position => ({
    id: position.formacion_id,
    branch: position.ramal,
    moviendose: position.estado_mov === 1,
    funcionando: position.estado_servicio === 1,
    position: {lat: Number(position.latitud), lng: Number(position.longitud)}
  })
))

export const shapeResponse = ({preferences}: any, {arrivals, positions}: DataResponse) => ({
  positions: positions,
  arrivals: getActiveArrival(arrivals, preferences)
})

export const hasData = ({positions, arrivals}: DataState): boolean => (!positions.isEmpty() && !!arrivals)
export const hasError = ({error}: DataState): boolean => !!error
export const getPositions = ({positions}: DataState) => positions
export const getArrivals = ({arrivals}: DataState) => arrivals
