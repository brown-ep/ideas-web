import React from 'react'

import Idea from './Idea'
import { Link } from 'react-router-dom'

const IdeaList = ({ ideas }) => (
  <div className="container max-w-md mx-auto text-center pb-20">
    <Link
      to="/new"
      className="bg-blue shadow-md hover:shadow-lg active:bg-red text-white font-bold p-3 no-underline rounded-sm mb-5 inline-block"
    >
      New Idea
    </Link>
    {ideas.map(idea => (
      <Idea key={idea.id} idea={idea} />
    ))}
  </div>
)

export default IdeaList
