import React from 'react'
import Avatar from 'react-avatar'
import moment from 'moment'

export default ({ idea: { title, name, description, created } }) => (
  <div className="rounded shadow leading-normal text-left mx-auto my-4 p-4 m-2 bg-white flex">
    <div className="mx-3">
      <Avatar size={48} round name={name} />
    </div>
    <div className="flex-1 ">
      <div>
        <span className="text-xs text-grey-dark uppercase mr-3">{name}</span>
        <span className="text-xs text-grey">
          {moment(created.toDate()).fromNow()}
        </span>
      </div>
      <h1 className="text-2xl">{title}</h1>
      <p className="text-lg font-light">{description}</p>
      <div className="flex mt-3 mb-1">
        <a href="#like" className="mr-3 text-grey-darkest">
          <i className="far fa-heart" />
        </a>
        <a href={`mailto:oscar_newman@brown.edu`} className="text-grey-darkest">
          <i className="far fa-comment" />
        </a>
        {/* <span className="flex-1" /> */}
        {/* <p className="text-xs text-grey-dark">Seen by 113</p> */}
      </div>
    </div>
  </div>
)
