import { combineReducers } from 'redux'

import data from './data'
import preferences from './preferences'

const rootReducer = combineReducers({
  data,
  preferences
})

export default rootReducer
