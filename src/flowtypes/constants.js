export type Direction = {
  id: number,
  name: string,
  color: string
}

export type Station = {
  id: string,
  name: string,
  position: {lat: number, lng: number}
}

export type Branch = {
  id: number,
  slug: string,
  name: string,
  directions: Direction[],
  stations: Station[],
  path: string
}

export type Line = {
  id: string,
  name: string,
  branches: Branch[]
}
