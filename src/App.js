import React, { Component } from 'react';
import {connect} from 'react-redux'

import {fetchJoke} from './actions/api'
import {getJokes} from './reducers/jokes'
import './App.css';

class App extends Component {
  componentDidMount () {
    for (let i = 0; i < 10; i++) {
      this.props.fetchJoke()
    }
  }

  render() {
    const {jokes} = this.props
    return (
      <div className="App">
        <div className="App-header">
          <h2>Chuck jokes</h2>
        </div>
        <div className="App-intro">
          {jokes.map((joke, key) => (
            <div key={key}>
              <p>{joke}</p>  
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({jokes}) => ({
  jokes: getJokes(jokes)
})

const mapDispatchToProps = {
  fetchJoke: fetchJoke.run
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
