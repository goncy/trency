import type {PreferencesState} from '../flowtypes/preferences'

export const preferencesSet = ({line, branch, station}: PreferencesState): boolean => Boolean(line && branch && station)
