import React, { Component } from 'react';
import {connect} from 'react-redux'

import {fetchPerson} from './actions/api'
import './App.css';

class App extends Component {
  componentDidMount () {
    for (let i = 1; i < 10; i++) {
      this.props.fetchPerson(i)
    }
  }

  render() {
    const {people} = this.props
    return (
      <div className="App">
        <div className="App-header">
          <h2>SWAPI People</h2>
        </div>
        <div className="App-intro">
          {people.map((person, key) => (
            <div key={key}>
              <p>{person.name}</p>  
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({people}) => ({
  people: people.toArray()
})

const mapDispatchToProps = {
  fetchPerson: fetchPerson.run
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
