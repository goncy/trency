import * as types from '../types'
import {makeAction} from '../utils/makeActionCreator'

export const fetchTrains = makeAction(types.FETCH_TRENES)
export const fetchArrivals = makeAction(types.FETCH_HORARIOS)
export const fetchData = makeAction(types.FETCH_DATA)
export const clearData = makeAction(types.CLEAR_DATA)
