// @flow

import {List} from 'immutable'

import type {RawArrival, RawPosition, Arrival, Position, DataState} from '../flowtypes/data'

export const shapeArrivals = (arrivals: RawArrival[]): List<Arrival> => List(
  arrivals.map(arrival => ({
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
))

export const shapePositions = (positions: RawPosition[]): List<Position> => List(
  positions.map(position => ({
    id: position.formacion_id,
    branch: position.ramal,
    moviendose: position.estado_mov === 1,
    funcionando: position.estado_servicio === 1,
    position: {lat: Number(position.latitud), lng: Number(position.longitud)}
  })
))

export const hasData = ({positions, arrivals}: DataState): boolean => (!positions.isEmpty() && !!arrivals)
export const hasError = ({error}: DataState): boolean => !!error
export const getPositions = ({positions}: DataState) => positions
export const getArrivals = ({arrivals}: DataState) => arrivals
