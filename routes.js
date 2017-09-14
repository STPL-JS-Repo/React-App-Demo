import React from 'react';
import {Route, IndexRoute  } from 'react-router'
import AppView from '../components/appview.jsx';
import Movies from '../components/movies.jsx';
import App from '../app.jsx';
export default (
      <Route path = "/" component = {App}>
         <IndexRoute component = {AppView} />
         <Route path = "movies" component = {Movies} />
      </Route>
 );