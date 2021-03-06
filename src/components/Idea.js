import React, { Component } from 'react'
import Avatar from 'react-avatar'
import moment from 'moment'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withFirebase, isEmpty, withFirestore } from 'react-redux-firebase'
import classnames from 'classnames'
import { getTags } from '../api/tags'
class Idea extends Component {
  state = {
    tags: [],
  }

  authed = () => !isEmpty(this.props.auth)
  liked = id => this.props.likes.map(({ id }) => id).indexOf(id) !== -1

  toggleLike = id => {
    console.log(`toglging ${id}`)
    if (!this.liked(id)) {
      const ref = this.props.firestore.collection('ideas').doc(id)

      this.props.firebase.updateProfile({
        likes: [...this.props.likes, ref],
      })
    } else {
      let cur = this.props.likes.filter(val => val.id !== id)
      this.props.firebase.updateProfile({ likes: cur })
    }
  }

  loadTags = async () => {
    const tags = (await getTags(this.props.idea.tags)).map(({ name }) => name)
    this.setState({ tags: tags })
  }

  componentDidMount() {
    if (this.props.idea) this.loadTags()
  }

  render() {
    const {
      idea: { id, title, name, description, created },
    } = this.props

    return (
      <div className="rounded shadow-lg leading-normal text-left mx-auto my-4 p-4 m-2 bg-white flex">
        <div className="mx-3">
          <Avatar size={48} round name={name} />
        </div>
        <div className="flex-1 ">
          <div>
            <span className="text-xs text-grey-dark uppercase mr-3">
              {name}
            </span>
            <span className="text-xs text-grey">
              {moment(created.toDate()).fromNow()}
            </span>
          </div>
          <h1 className="text-2xl">{title}</h1>
          <p className="text-lg font-light">{description}</p>
          <div className="tags -m-1 pt-2">
            {this.state.tags.map(tag => (
              <div
                key={tag}
                className="text-xs uppercase bg-grey-lighter text-grey-darker font-bold px-2 py-1 m-1 rounded-sm inline-block"
              >
                {tag}
              </div>
            ))}
          </div>
          <div className="flex mt-3 mb-1">
            {this.authed() && (
              <button
                className="mr-3 text-grey-darkest focus:outline-none"
                onClick={() => this.toggleLike(id)}
              >
                <i
                  className={classnames(
                    'fa-heart',
                    { far: !this.liked(id) },
                    { 'fas text-red-light': this.liked(id) }
                  )}
                />
              </button>
            )}
            <a
              href={`mailto:oscar_newman@brown.edu`}
              className="text-grey-darkest"
            >
              <i className="far fa-comment" />
            </a>
          </div>
        </div>
      </div>
    )
  }
}

export default compose(
  withFirebase,
  withFirestore,
  connect(({ firebase: auth }) => ({
    likes: auth.profile.likes ? auth.profile.likes : [],
    auth,
  }))
)(Idea)
