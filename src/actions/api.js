import * as types from '../types'
import {makeAction} from '../utils/makeActionCreator'

export const fetchTrenes = makeAction(types.FETCH_TRENES)
export const fetchHorarios = makeAction(types.FETCH_HORARIOS)
