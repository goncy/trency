import * as types from '../types'
import {makeAsyncAction} from '../utils/makeActionCreator'

export const fetchPerson = makeAsyncAction(types.FETCH_PERSON)
export const fetchPersons = makeAsyncAction(types.FETCH_PERSONS)
