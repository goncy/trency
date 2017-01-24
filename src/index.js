import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import rootSaga from './sagas'

import App from './components/App/'

import './index.css'

import 'bulma/css/bulma.css'
import 'animate.css/animate.css'

const store = configureStore()
store.runSaga(rootSaga)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
