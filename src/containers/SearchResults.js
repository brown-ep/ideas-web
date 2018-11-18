import React, { Component } from 'react'
import IdeaList from '../components/IdeaList'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'

import index from '../algolia'

class Home extends Component {
  state = {
    hits: [],
    loading: true,
  }

  update = () => {
    const { query } = this.props.match.params
    index.search(query, (err, content) => {
      if (err) {
        console.error(err)
      } else {
        let promises = []
        content.hits.forEach(hit => {
          promises.push(
            this.props.firestore
              .collection('ideas')
              .doc(hit.objectID)
              .get()
          )
        })
        Promise.all(promises).then(vals =>
          this.setState({ hits: vals.map(v => v.data()), loading: false })
        )
      }
    })
  }

  componentDidMount() {
    this.update()
  }

  componentDidUpdate() {
    this.update()
  }

  render() {
    const { hits, loading } = this.state

    console.log(hits)

    if (loading)
      return <div className="container mx-auto max-w-md">Loading...</div>

    return <div>{hits && <IdeaList ideas={hits} />}</div>
  }
}

export default compose(firestoreConnect(['ideas']))(Home)
