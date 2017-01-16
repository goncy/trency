import * as types from '../types'
import {makeAsyncAction} from '../utils/makeActionCreator'

export const fetchJoke = makeAsyncAction(types.FETCH_JOKE)
