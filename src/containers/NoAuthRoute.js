import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'

const authenticated = auth => isLoaded(auth) && !isEmpty(auth)

const PrivateRoute = ({ component: Component, auth, firebase, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      if (!authenticated(auth)) return <Component {...props} />
      else {
        return <Redirect to="/" />
      }
    }}
  />
)

export default compose(
  firebaseConnect(), // withFirebase can also be used
  connect(({ firebase: { auth } }) => ({ auth }))
)(PrivateRoute)
