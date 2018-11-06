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
      <div className="App bg-grey-light">
        <header className="App-header py-20">
          <div className="container mx-auto">
            <h1 className="text-5xl text-white pb-2">Have an idea?</h1>
            {/* {this.props.auth ? (
              <div>You are {this.props.profile()}</div>
            ) : (
              <button
                onClick={this.handleClick}
                class="text-xl text-blue bg-white rounded-sm p-2 font-bold"
              >
                Login
              </button>
            )} */}
          </div>
        </header>
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
