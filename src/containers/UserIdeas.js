import React, { Component } from 'react'
import IdeaList from '../components/IdeaList'
import { Link } from 'react-router-dom'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect, withFirebase, isLoaded } from 'react-redux-firebase'

class UserIdeas extends Component {
  state = {}

  componentDidMount() {
    this.load()
  }

  load = async () => {
    const { firestore, auth } = this.props
    const snap = await firestore
      .collection('ideas')
      .where('user', '==', auth.uid)
      .get()
    let ideas = []
    snap.forEach(doc => ideas.push(doc.data()))
    console.log(snap)
    this.setState({ ideas })
  }

  render() {
    const { auth } = this.props
    const { ideas } = this.state

    if (!isLoaded(auth) || !ideas)
      return <div className="max-w-md mx-auto text-grey-dark">Loading...</div>

    return <div>{ideas && <IdeaList ideas={ideas} />}</div>
  }
}

export default compose(
  withFirebase,
  firestoreConnect(['ideas']),
  connect(({ firestore, firebase: { auth } }, props) => ({
    auth,
  }))
)(UserIdeas)
