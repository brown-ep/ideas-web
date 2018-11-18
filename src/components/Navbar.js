import React from 'react'
import { toast } from 'react-toastify'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import { Link } from 'react-router-dom'
import Searchbar from './Searchbar'

const validEmail = email => {
  const regex = /^[a-zA-Z0-9_.+-]+@(?:(?:[a-zA-Z0-9-]+\.)?[a-zA-Z]+\.)?(brown|risd)\.edu$/g
  return regex.test(email)
}

const Navbar = ({ firebase, auth }) => (
  <div className="border-t-8 border-blue-dark mb-5">
    <div className="container mx-auto py-5 flex justify-between items-center">
      <Link
        to="/"
        className="logo text-2xl font-normal text-grey-darkest no-underline"
      >
        <span className="font-extrabold">Ideas </span>
        <span>on the hill</span>
      </Link>

      <div className="flex-1 max-w-sm">
        <Searchbar />
      </div>

      <div>
        {!isLoaded(auth) || isEmpty(auth) ? (
          <button
            className="font-semibold p-2 rounded-sm text-grey-darker hover:bg-grey-lighter no-underline"
            onClick={() =>
              firebase
                .login({ provider: 'google', type: 'redirect' })
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
            <Link
              to="/ideas"
              className="p-2 rounded-sm text-grey-darker hover:bg-grey-lighter no-underline mx-2"
            >
              My Ideas
            </Link>
            <Link
              to="/settings"
              className="p-2 rounded-sm text-grey-darker hover:bg-grey-lighter no-underline mx-2"
            >
              Settings
            </Link>
            <a
              href="#logout"
              className="font-semibold p-2 rounded-sm text-grey-darker hover:bg-grey-lighter no-underline"
              onClick={e => {
                e.preventDefault()
                firebase.logout()
              }}
            >
              Logout
            </a>
          </div>
        )}
      </div>
    </div>
    {!isEmpty(auth) && !validEmail(auth.email) && (
      <div className="error container max-w-lg mb-6 mx-auto bg-red-lighter border-8 border-red-lightest rounded text-red-darker flex p-4 items-center">
        <div className="icon text-5xl text-red-dark mr-6">
          <i className="fas fa-exclamation-circle" />
        </div>
        <div className="content flex-1">
          <p className="text-2xl font-bold mb-1">Heads up!</p>
          <p className="text-lg leading-normal">
            To post ideas, you must sign in with a Brown or RISD email address.
            Please sign out of this account and sign in wiht your school email.
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
