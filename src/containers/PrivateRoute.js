import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'

const authenticated = auth => !isEmpty(auth)

const PrivateRoute = ({ component: Component, auth, firebase, ...rest }) => {
  if (!isLoaded(auth))
    return (
      <div className="container mx-auto max-w-md text-grey">Loading...</div>
    )
  return (
    <Route
      // {...rest}
      render={props =>
        authenticated(auth) ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  )
}

export default compose(
  firebaseConnect(), // withFirebase can also be used
  connect(({ firebase: { auth } }) => ({ auth }))
)(PrivateRoute)
