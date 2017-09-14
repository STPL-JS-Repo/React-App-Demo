import React, { Component } from 'react'
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router'
import appdata from '../data/appdata.js'

import AppView from '../components/appview.jsx'
import Movies from '../components/movies.jsx'
import BookNow from '../components/booknow.jsx'
import MoviesDetails from '../components/moviedetail.jsx'

class App extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path='/' component={AppView} />
        <Route path='/movies' component={Movies} />
        <Route path='/booknow' component={BookNow} />
        <Route path='/details' component={MoviesDetails} />
      </Router>
    )
  }
}
export default App;