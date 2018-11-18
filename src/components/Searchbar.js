import React, { Component } from 'react'

import './Searchbar.sass'
import { withRouter } from 'react-router-dom'

class Searchbar extends Component {
  state = {
    query: '',
  }

  handleChange = e => {
    const str = e.target.value
    this.setState({ query: str })
  }

  submit = e => {
    e.preventDefault()
    const { query } = this.state
    this.props.history.push(`/search/${query}`)
  }

  render() {
    const { query } = this.state

    return (
      <form onSubmit={this.submit} className="relative w-full">
        <input
          type="text"
          value={query}
          onChange={this.handleChange}
          className=" z-10 nav-search-bar block w-full mx-auto bg-white border-none rounded-sm py-4 px-8 shadow-lg outline-none appearance-none"
          placeholder="Search ideas"
        />
      </form>
    )
  }
}

export default withRouter(Searchbar)
