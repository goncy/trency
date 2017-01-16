import Immutable from 'immutable'

import {fetchJoke} from '../actions'

type jokesState = Immutable.Map<any>

type jokesAction = {
  type: string,
  payload: any
}

const jokes = (state: jokesState = Immutable.Set(), {type, payload}: jokesAction) => {
  switch (type) {
    case fetchJoke.SUCCESS:
      return state.add(payload)
    default:
      return state
  }
}

export const getJokes = jokes => jokes
  .map(joke => joke.value)

export default jokes
