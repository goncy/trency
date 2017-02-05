// @flow
import {LINES} from '../constants'

import type {Line, Branch, Station, Direction} from '../flowtypes/constants'

export const getLines: Line[] = LINES
  .map(({id, name}) => ({id, name}))

export const getLine = (id: string): Line => LINES
  .find(line => line.id === id)

export const getBranch = (line: Line, id: number): Branch => LINES
  .find(ln => ln.id === line.id)
  .branches
  .find(branch => branch.id === id)

export const getStation = (branch: Branch, id: number): Station => branch
  .stations
  .find(station => station.id === id)

export const getDirection = (branch: Branch, id: number): Direction => branch
  .directions
  .find((direction: Direction) => direction.id === id)

// Icons
export const getPositionIcon = (color: string): string =>
  `${process.env.PUBLIC_URL || ''}/train-${color}.svg`

export const getStationMarkerIcon = (isSelected: boolean): string =>
  `${process.env.PUBLIC_URL || ''}/station${isSelected ? '-seleccionada' : ''}-marker.svg`

export const getStationIcon = (isSelected: boolean): string =>
  `${process.env.PUBLIC_URL || ''}/station${isSelected ? '-seleccionada' : ''}-icon.svg`
