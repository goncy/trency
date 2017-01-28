// @flow

export type PreferencesState = {
  line: ?any,
  branch: ?any,
  station: ?{
    id: string,
    name: string,
    position: {lat: number, lng: number}
  }
}
