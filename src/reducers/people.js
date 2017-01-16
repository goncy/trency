import Immutable from 'immutable'

import {fetchPerson} from '../actions'

type peopleState = Immutable.Map<any>

type peopleAction = {
  type: string,
  payload: any
}

const people = (state: peopleState = Immutable.Map(), {type, payload}: peopleAction) => {
  switch (type) {
    case fetchPerson.SUCCESS:
      return state.set(payload.id, payload)
    default:
      return state
  }
}

export default people
