import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect, isLoaded, withFirebase } from 'react-redux-firebase'
import IdeaList from './IdeaList'

class Settings extends Component {
  state = {
    ideas: [],
  }

  tags = () => {
    const { profile } = this.props
    if (!isLoaded(profile)) return []

    if (!profile.tags) return []
    return profile.tags
  }

  tagActive = id => this.tags().indexOf(id) !== -1

  toggleTag = id => {
    const { firebase } = this.props
    let cur = this.tags()

    if (this.tagActive(id)) {
      cur = cur.filter(val => val !== id)
      firebase.updateProfile({ tags: cur })
    } else {
      firebase.updateProfile({ tags: [...cur, id] })
    }
  }

  loadIdeas = () => {
    const { likes } = this.props
    if (!likes) return

    let promises = []
    likes.forEach(({ id }) => {
      promises.push(
        this.props.firestore
          .collection('ideas')
          .doc(id)
          .get()
      )
    })

    Promise.all(promises).then(vals => {
      let real = vals.filter(v => v.exists)
      real = real.map(doc => doc.data())
      this.setState({ ideas: real })
    })
  }

  componentDidMount() {
    this.loadIdeas()
  }

  componentDidUpdate() {
    this.loadIdeas()
  }

  render() {
    return (
      <div className="container mx-auto max-w-md mt-8 text-grey-darkest">
        <h1 className="font-black mb-2">My Interests</h1>
        <p className="leading-normal text-lg mb-4">
          Select your interests and skills to fine-tune the ideas showed in your
          feed.
        </p>

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

        <h1 className="font-black mb-8 mt-16 block">Liked Ideas</h1>

        <div className="-mx-1 -my-2">
          {this.state.ideas && <IdeaList ideas={this.state.ideas} />}
        </div>
      </div>
    )
  }
}

export default compose(
  withFirebase,
  firestoreConnect(['tags', 'ideas']), // or { collection: 'todos' }
  connect(({ firestore, firebase: auth }, props) => ({
    tags: firestore.ordered.tags,
    profile: auth.profile,
    likes: auth.profile.likes,
  }))
)(Settings)
