import React, { Component } from 'react'
import { firebaseConnect } from 'react-redux-firebase'
import { connect } from 'react-redux'
import '../App.css'
import Login from '../Login'

class App extends Component {
  handleClick = () => {
    this.props.firebase.login({
      provider: 'google',
      type: 'redirect',
    })
  }
  render() {
    return (
      <div className="App">
        <Login />
      </div>
    )
  }
}

export default firebaseConnect()(
  connect(state => ({
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  }))(App)
)
