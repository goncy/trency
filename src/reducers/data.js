// @flow

import {List} from 'immutable'

import type {DataState, Position, Arrival} from '../flowtypes/data'

import {fetchData, clearData} from '../actions/api'

type DataAction = {
  type: string,
  payload: {
    positions: List<Position>,
    arrivals: List<Arrival>,
    error: ?string
  }
}

const data = (
  state: DataState = {
    positions: List(),
    arrivals: List(),
    error: null,
    status: 'init'
  },
  {type, payload}: DataAction): DataState => {
  switch (type) {
    case fetchData.SUCCESS:
      return {
        ...state,
        status: 'success',
        error: null,
        positions: payload.positions,
        arrivals: payload.arrivals
      }
    case fetchData.FAILURE:
      return {
        ...state,
        error: payload.error,
        status: 'failure'
      }
    case fetchData.START:
      return {
        ...state,
        status: 'pending'
      }
    case clearData.type:
      return {
        positions: List(),
        arrivals: List(),
        error: null,
        status: 'init'
      }
    default:
      return state
  }
}

export default data
