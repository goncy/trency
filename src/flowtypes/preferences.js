// @flow
import type {Branch, Station} from './constants'

export type PreferencesState = {
  line: ?any,
  branch: ?Branch,
  station: ?Station
}
