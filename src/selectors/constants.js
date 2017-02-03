// @flow
import {createSelector} from 'reselect'

import {LINES} from '../constants'

import type {Line, Branch, Station, Direction} from '../flowtypes/constants'

export const getLines: Line[] = LINES
  .map(({id, name}) => ({id, name}))

export const getLine: Line = createSelector(
  (id: string) => id,
  (id: string) => LINES
    .find(line => line.id === id)
)

export const getBranch: Branch = createSelector(
  (line: Line, id: number) => line,
  (line: Line, id: number) => id,
  (line: Line, id: number) => LINES
    .find(ln => ln.id === line.id)
    .branches
    .find(branch => branch.id === id)
)

export const getStation: Station = createSelector(
  (branch: Branch, id: number) => branch,
  (branch: Branch, id: number) => id,
  (branch: Branch, id: number) => branch
    .stations
    .find(station => station.id === id)
)

export const getDirection: Direction = createSelector(
  (branch: Branch, id: number) => branch,
  (branch: Branch, id: number) => id,
  (branch: Branch, id: number) => branch
    .directions
    .find((direction: Direction) => direction.id === id)
)

// Icons
export const getPositionIcon = (color: string): string =>
  `${process.env.PUBLIC_URL || ''}/train-${color}.svg`

export const getStationMarkerIcon = (isSelected: boolean): string =>
  `${process.env.PUBLIC_URL || ''}/station${isSelected ? '-seleccionada' : ''}-marker.svg`

export const getStationIcon = (isSelected: boolean): string =>
  `${process.env.PUBLIC_URL || ''}/station${isSelected ? '-seleccionada' : ''}-icon.svg`
