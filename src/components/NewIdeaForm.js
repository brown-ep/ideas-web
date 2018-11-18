import React, { Component } from 'react'
import { toast } from 'react-toastify'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import {
  firebaseConnect,
  firestoreConnect,
  isLoaded,
  isEmpty,
} from 'react-redux-firebase'

class NewIdeaForm extends Component {
  state = {
    name: '',
    description: '',
    redirect: false,
  }

  handleNameChange = e => this.setState({ name: e.target.value })
  handleDescChange = e => this.setState({ description: e.target.value })

  savePost = () => {
    const { name, description } = this.state
    const { firestore, auth, firebase } = this.props

    firestore
      .collection('ideas')
      .add({
        title: name,
        description,
        name: auth.displayName,
        user: firestore.collection('users').doc(auth.uid),
        created: new Date(),
      })
      .then(() => this.setState({ redirect: true }))
      .catch(err => {
        toast.error(err.message)
        firebase.logout()
      })
  }

  handlePost = () => {
    const { auth, firebase } = this.props

    if (!isLoaded(auth) || isEmpty(auth)) {
      firebase
        .login({ provider: 'google', type: 'popup' })
        .then(this.savePost)
        .catch(err => toast.error(err.message))
    } else {
      this.savePost()
    }
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />
    }
    return (
      <div className="container max-w-md mx-auto">
        <h1 className="text-grey-darkest text-5xl font-black mb-2">New Idea</h1>
        <p className="leading-normal text-grey-darkest font-light text-xl mb-5">
          Have an idea? Fill out a basic description and post to get feedback
          from the community, build a team, and find like-minded people who want
          to work with you.
        </p>
        <div className="mb-5">
          <label
            htmlFor="name"
            className="text-sm text-grey-darker font-bold uppercase block mb-2"
          >
            Idea Name
          </label>
          <input
            type="text"
            value={this.state.name}
            onChange={this.handleNameChange}
            className="px-2 py-4 shadow rounded-sm outline-none block w-full"
            id="name"
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="name"
            className="text-sm text-grey-darker font-bold uppercase block mb-2"
          >
            Brief description{' '}
            <span className="font-normal">(Max 280 characters)</span>
          </label>
          <textarea
            className="px-2 py-3 shadow rounded-sm outline-none block w-full h-32"
            maxLength={280}
            value={this.state.description}
            onChange={this.handleDescChange}
            id="description"
          />
        </div>

        <button
          className="bg-blue text-white block w-full rounded-sm mt-8 font-bold text-bold px-4 py-3"
          onClick={this.handlePost}
        >
          Post Idea
        </button>
      </div>
    )
  }
}

export default compose(
  firebaseConnect(), // withFirebase can also be used
  firestoreConnect(),
  connect(({ firebase: { auth } }) => ({ auth }))
)(NewIdeaForm)
