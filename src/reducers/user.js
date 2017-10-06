// @flow
import { idleChanged } from "../actions/user"

import type { UserState } from "../flowtypes/user"

type UserAction = {
  type: string,
  payload: any
}

const user = (
  state: UserState = {
    idle: false
  },
  { type, payload }: UserAction
): UserState => {
  switch (type) {
    case idleChanged.type:
      return {
        ...state,
        idle: payload
      }
    default:
      return state
  }
}

export default user
