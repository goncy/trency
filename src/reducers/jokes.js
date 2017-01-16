import Immutable from 'immutable'

import {fetchJoke} from '../actions'

type jokesState = Immutable.Map<any>

type jokesAction = {
  type: string,
  payload: any
}

const jokes = (state: jokesState = Immutable.List(), {type, payload}: jokesAction) => {
  switch (type) {
    case fetchJoke.SUCCESS:
      return state.push(payload)
    default:
      return state
  }
}

export default jokes
