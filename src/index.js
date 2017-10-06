import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"

import configureStore from "./store/configureStore"
import rootSaga from "./sagas"

import AppRouter from "./AppRouter"

import "./index.css"

import "bulma/css/bulma.css"
import "animate.css/animate.css"

const store = configureStore()
store.runSaga(rootSaga)

ReactDOM.render(
  <Provider store={store}>
    <AppRouter />
  </Provider>,
  document.getElementById("root")
)
