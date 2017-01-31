// @flow

import {List} from 'immutable'

import type {DataState, RawPosition, RawArrival} from '../flowtypes/data'

import {fetchData} from '../actions/api'
import {shapeArrivals, shapePositions} from '../selectors/data'

type DataAction = {
  type: string,
  payload: {
    positions: RawPosition[],
    arrivals: RawArrival[],
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
        positions: shapePositions(payload.positions),
        arrivals: shapeArrivals(payload.arrivals)
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
    default:
      return state
  }
}

export default data
