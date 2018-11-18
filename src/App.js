import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'

import Navbar from './components/Navbar'
import NewIdeaForm from './components/NewIdeaForm'
import Settings from './components/Settings'
import PrivateRoute from './containers/PrivateRoute'
import LoginForm from './components/LoginForm'
import NoAuthRoute from './containers/NoAuthRoute'
import Home from './pages/Home'
import UserIdeas from './containers/UserIdeas'
import SearchResults from './containers/SearchResults'

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
        <Switch>
          <Route exact={true} path="/" render={() => <Home ideas={ideas} />} />
          <Route path="/search/:query" component={SearchResults} />
          <NoAuthRoute path="/login" component={LoginForm} />
          <PrivateRoute path="/new" component={NewIdeaForm} />
          <PrivateRoute path="/settings" component={Settings} />
          <PrivateRoute path="/ideas" component={UserIdeas} />
        </Switch>
      </div>
    )
  }
}
export default compose(
  firestoreConnect([
    { collection: 'ideas', orderBy: ['created', 'desc'], limit: 25 },
  ]), // or { collection: 'todos' }
  connect(({ firestore }, props) => ({
    ideas: firestore.ordered.ideas,
  }))
)(App)
