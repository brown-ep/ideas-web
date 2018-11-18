import React from 'react'

import Idea from './Idea'
import { Link } from 'react-router-dom'

const IdeaList = ({ ideas }) => (
  <div className="container max-w-md mx-auto text-center pb-20">
    {ideas.map(idea => (
      <Idea key={idea.id} idea={idea} />
    ))}
  </div>
)

export default IdeaList
