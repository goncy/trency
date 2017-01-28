// @flow

export type Station = {
  id: string,
  name: string,
  position: {lat: number, lng: number}
}

export type Branch = {
  id: number,
  slug: string,
  name: string,
  directions: {
    id: number,
    name: string,
    color: string
  }[],
  stations: Station[],
  path: string
}

export type Line = {
  id: string,
  name: string,
  branches: Branch[]
}

export type PreferencesState = {
  line: ?any,
  branch: ?Branch,
  station: ?Station
}
