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
    selectedTags: [],
    redirect: false,
  }

  handleNameChange = e => this.setState({ name: e.target.value })
  handleDescChange = e => this.setState({ description: e.target.value })

  tagActive = id => this.state.selectedTags.indexOf(id) !== -1

  toggleTag = id => {
    let cur = this.state.selectedTags

    if (this.tagActive(id)) {
      cur = cur.filter(val => val !== id)
      this.setState({ selectedTags: cur })
    } else {
      this.setState({ selectedTags: [...cur, id] })
    }
  }

  savePost = () => {
    const { name, description, selectedTags } = this.state
    const { firestore, auth, firebase } = this.props

    firestore
      .collection('ideas')
      .add({
        title: name,
        description,
        name: auth.displayName,
        user: auth.uid,
        tags: selectedTags,
        created: new Date(),
      })
      .then(() => this.setState({ redirect: true }))
      .catch(err => {
        toast.error(err.message)
        firebase.logout()
      })
  }

  handlePost = e => {
    e && e.preventDefault()
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
      <form
        onSubmit={this.handlePost}
        className="container max-w-md mx-auto pb-16"
      >
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
            required
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
            required
            value={this.state.description}
            onChange={this.handleDescChange}
            id="description"
          />
        </div>

        <div className="mb-5">
          <label className="text-sm text-grey-darker font-bold uppercase block mb-2">
            Tags
          </label>
          <div className="-mx-1 -my-2">
            {this.props.tags &&
              this.props.tags.map(tag => (
                <a
                  href="#toggle"
                  onClick={e => {
                    e.preventDefault()
                    this.toggleTag(tag.id)
                  }}
                  className={
                    'p-2 bg-white no-underline shadow outline-none appearance-none text-grey-dark inline-block mx-1 my-2 rounded-sm font-bold ' +
                    (this.tagActive(tag.id) ? 'bg-red-light text-white' : '')
                  }
                  key={tag.id}
                >
                  {tag.name}
                </a>
              ))}
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue text-white block w-full rounded-sm mt-8 font-bold text-bold px-4 py-3"
        >
          Post Idea
        </button>
      </form>
    )
  }
}

export default compose(
  firebaseConnect(), // withFirebase can also be used
  firestoreConnect(['tags']),
  connect(({ firestore, firebase: { auth } }) => ({
    auth,
    tags: firestore.ordered.tags,
  }))
)(NewIdeaForm)
