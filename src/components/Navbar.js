import React from 'react'
import { toast } from 'react-toastify'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import { Link } from 'react-router-dom'

const validEmail = email => console.log

const Navbar = ({ firebase, auth }) => (
  <div className="border-t-8 border-blue-dark">
    <div className="container mx-auto py-5 flex justify-between">
      <Link
        to="/"
        className="logo text-2xl font-normal text-grey-darkest no-underline"
      >
        <span className="font-extrabold">Ideas </span>
        <span>on the hill</span>
      </Link>
      <div>
        {!isLoaded(auth) || isEmpty(auth) ? (
          <button
            className="font-semibold p-2 rounded-sm text-grey-darker hover:bg-grey-lighter no-underline"
            onClick={() =>
              firebase
                .login({ provider: 'google', type: 'popup' })
                .catch(error => {
                  console.log(error)
                  toast.error(error.message)
                })
            }
          >
            Login with School Email
          </button>
        ) : (
          <div>
            <a
              href="#nav"
              className="p-2 rounded-sm text-grey-darker hover:bg-grey-lighter no-underline mx-2"
            >
              My Ideas
            </a>
            <a
              href="#nav"
              className="p-2 rounded-sm text-grey-darker hover:bg-grey-lighter no-underline mx-2"
            >
              Settings
            </a>
            <a
              href="#logout"
              className="font-semibold p-2 rounded-sm text-grey-darker hover:bg-grey-lighter no-underline"
              onClick={() => firebase.logout()}
            >
              Logout
            </a>
          </div>
        )}
      </div>
    </div>
    {false &&
      !isEmpty(auth) &&
      validEmail(auth.email) && (
        <div className="error">
          <div className="icon">
            <i className="fas fa-error" />
          </div>
          <div className="content">
            <p>Heads up!</p>
            <p>
              To post ideas, you must sign in with a Brown or RISD email
              address.
            </p>
          </div>
        </div>
      )}
  </div>
)

export default compose(
  firebaseConnect(), // withFirebase can also be used
  connect(({ firebase: { auth } }) => ({ auth }))
)(Navbar)
