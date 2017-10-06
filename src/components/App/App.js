// @flow

import React from "react"

import AppMap from "../AppMap"
import IdleWindow from "../IdleWindow"
import Directions from "../Directions"
import Preferences from "../Preferences"
import Arrivals from "../Arrivals"

const App = () => (
  <div className="App-container flex-column">
    {/* IdleWindow */}
    <IdleWindow />
    {/* Directions */}
    <Directions />
    {/* Preferences */}
    <Preferences />
    {/* Mapa */}
    <AppMap />
    {/* Arrivals */}
    <Arrivals />
  </div>
)

export default App
