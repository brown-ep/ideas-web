import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
// import GoogleButton from 'react-google-button' // optional

export const Login = ({ firebase, auth }) => (
  <div>
    <button // <GoogleButton/> button can be used instead
      onClick={() => firebase.login({ provider: 'google', type: 'popup' })}
    >
      Login With Google
    </button>
    <div>
      <h2>Auth</h2>
      {!isLoaded(auth) ? (
        <span>Loading...</span>
      ) : isEmpty(auth) ? (
        <span>Not Authed</span>
      ) : (
        <div>
          <a href="#logout" onClick={() => firebase.logout()}>
            Logout
          </a>
        </div>
      )}
    </div>
  </div>
)

export default compose(
  firebaseConnect(), // withFirebase can also be used
  connect(({ firebase: { auth } }) => ({ auth }))
)(Login)
