import {TRAIN_STATIC_DATA} from './constants'

export const getLineas = TRAIN_STATIC_DATA
  .map(({id, name}) => ({id, name}))

export const getRamales = linea => TRAIN_STATIC_DATA
  .find(ln => ln.id === linea.id)
  .ramales

export const getLinea = linea => TRAIN_STATIC_DATA
  .find(ln => ln.id === linea)

export const getRamal = (linea, ramal) => getRamales(linea)
  .find(rm => rm.id === ramal)

export const getEstaciones = (linea, ramal) => getRamales(linea)
  .find(rm => rm.id === ramal)
  .estaciones

export const getEstacion = (ramal, estacion) => ramal
  .estaciones
  .find(est => est.id === estacion)

export const getEstacionIndex = (ramal, estacion) => ramal
  .estaciones
  .findIndex(est => est.id === estacion)

export const getRamalColor = (ramal, id) => ramal
  .destinos
  .find(destino => destino.id === id)
  .color
