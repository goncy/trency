// @flow

import React from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"

import { idleChanged } from "../../actions/user"

import type { AppState } from "../../flowtypes/globals"

import "./IdleWindow.css"

export type IdleWindowProps = {
  close: () => void,
  isIdle: boolean
}

const IdleWindow = ({ close, isIdle }: IdleWindowProps) => (
  <div className="IdleWindow">
    <div className={`modal ${isIdle ? "is-active" : ""}`}>
      <div className="modal-background" />
      <div className="modal-content">
        <div className="notification">
          <div className="content is-medium">
            <h1>¿Estás ahí?</h1>
            <div onClick={close} className="button is-primary is-large">
              ¡Acá estoy!
            </div>
            <div className="notification small">
              <div className="content">
                <small>
                  Solo nos aseguramos de no gastar tu plan de datos si te
                  olvidaste la aplicación abierta
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)

const mapStateToProps = ({ user }: AppState) => ({
  isIdle: user.idle
})

const mapDispatchToProps = {
  close: () => idleChanged.run(false)
}

IdleWindow.propTypes = {
  isIdle: PropTypes.bool,
  close: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(IdleWindow)
