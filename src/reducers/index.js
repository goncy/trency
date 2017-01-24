import { combineReducers } from 'redux'

import trenes from './trenes'
import preferences from './preferences'
import horarios from './horarios'

const rootReducer = combineReducers({
  trenes,
  preferences,
  horarios
})

export default rootReducer
