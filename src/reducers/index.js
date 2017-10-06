import { combineReducers } from "redux"

import data from "./data"
import user from "./user"
import preferences from "./preferences"

const rootReducer = combineReducers({
  data,
  user,
  preferences
})

export default rootReducer
