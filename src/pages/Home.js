import React, { Component } from 'react'
import IdeaList from '../components/IdeaList'
import { Link } from 'react-router-dom'

class Home extends Component {
  state = {}
  render() {
    const { ideas } = this.props
    return (
      <div>
        <div className="container mx-auto max-w-md text-center mt-5">
          <Link
            to="/new"
            className="bg-blue-lightest px-4 py-3 font-bold no-underline rounded-sm text-blue-dark border border-blue-lighter mb-5 block"
          >
            <i className="fas fa-plus mr-2" />
            New Idea
          </Link>
        </div>
        {ideas && <IdeaList ideas={ideas} />}
      </div>
    )
  }
}

export default Home
