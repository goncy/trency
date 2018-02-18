// @flow
import type { DataState } from "./data";
import type { PreferencesState } from "./preferences";
import type { UserState } from "./user";

export type AppState = {
  data: DataState,
  preferences: PreferencesState,
  user: UserState
};
