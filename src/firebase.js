import firebase from 'firebase'

var config = {
  apiKey: 'AIzaSyDNOXCCYb7VulBQx3sNFZ-ORaYEsvRRGP4',
  authDomain: 'brown-ep-startup-ideas-app.firebaseapp.com',
  databaseURL: 'https://brown-ep-startup-ideas-app.firebaseio.com',
  projectId: 'brown-ep-startup-ideas-app',
  storageBucket: 'brown-ep-startup-ideas-app.appspot.com',
  messagingSenderId: '165580362455',
}

const fire = firebase.initializeApp(config)
export default fire
