import React from 'react';
import { Router, Route, Link, browserHistory, IndexRoute  } from 'react-router'
import appdata from '../data/appdata.js'
import Header from '../components/header.jsx'
import AppView from '../components/appview.jsx'
import Login from '../components/login.jsx'
import Footer from '../components/footer.jsx'

class App extends React.Component {
   render() {
      return (
         <div> 
            <Router history = {browserHistory}>
      <Route path = "/" component = {Header}>
         <IndexRoute component = {App} />
         <Route path = "movies" component = {App} />
         <Route path = "shows" component = {App} />
         <Route path = "events" component = {App} />
         <Route path = "trailer-videos" component = {App} />
      </Route>
   </Router>
         <AppView />
         <Footer /> 
         <Login />
         </div>
      );

   }
   }


export default App;