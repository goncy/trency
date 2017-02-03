import {createSelector} from 'reselect'

import {LINES} from '../constants'

import type {Direction} from '../flowtypes/data'
import type {Branch} from '../flowtypes/preferences'

export const getLines = LINES
  .map(({id, name}) => ({id, name}))

export const getBranches = line => LINES
  .find(ln => ln.id === line.id)
  .branches

export const getLine = line => LINES
  .find(ln => ln.id === line)

export const getBranch = (line, branch) => getBranches(line)
  .find(rm => rm.id === branch)

export const getStation = (branch, station) => branch
  .stations
  .find(est => est.id === station)

export const getStationIndex = (branch, station) => branch
  .stations
  .findIndex(est => est.id === station)

// Icons
export const getPositionIcon = (color: string): string =>
  `${process.env.PUBLIC_URL || ''}/train-${color}.svg`

export const getStationMarkerIcon = (isSelected: boolean): string =>
  `${process.env.PUBLIC_URL || ''}/station${isSelected ? '-seleccionada' : ''}-marker.svg`

export const getStationIcon = (isSelected: boolean): string =>
  `${process.env.PUBLIC_URL || ''}/station${isSelected ? '-seleccionada' : ''}-icon.svg`

// Experimental
export const getDirection: Direction = createSelector(
  (branch: Branch, id: number) => branch,
  (branch: Branch, id: number) => id,
  (branch: Branch, id: number) => branch
    .directions
    .find((direction: Direction) => direction.id === id)
)
