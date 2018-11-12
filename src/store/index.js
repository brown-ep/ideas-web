import { compose } from 'redux'
import { createStore } from 'redux'
import { reactReduxFirebase } from 'react-redux-firebase'
import { reduxFirestore } from 'redux-firestore'
import rootReducer from './reducers'
import firebase from '../firebase'

// react-redux-firebase options
const config = {
  userProfile: 'users', // firebase root where user profiles are stored
  enableLogging: false, // enable/disable Firebase's database logging
  useFirestoreForProfile: true,
}

// Add redux Firebase to compose
const createStoreWithFirebase = compose(
  reduxFirestore(firebase),
  reactReduxFirebase(firebase, config)
)(createStore)

// Create store with reducers and initial state
const store = createStoreWithFirebase(rootReducer)

export default store
