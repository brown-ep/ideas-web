import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'

import IdeaList from './components/IdeaList'
import Navbar from './components/Navbar'
import NewIdeaForm from './components/NewIdeaForm'

class App extends Component {
  componentDidMount() {
    console.log(this.props.ideas)
  }
  render() {
    const { ideas } = this.props
    return (
      <div className="bg-grey-lightest min-h-full">
        <Navbar />
        <ToastContainer />
        <Route
          exact={true}
          path="/"
          render={() => <div>{ideas && <IdeaList ideas={ideas} />} </div>}
        />
        <Route path="/new" component={NewIdeaForm} />
      </div>
    )
  }
}
export default compose(
  firestoreConnect([{ collection: 'ideas', orderBy: ['created', 'desc'] }]), // or { collection: 'todos' }
  connect((state, props) => ({
    ideas: state.firestore.ordered.ideas,
  }))
)(App)
