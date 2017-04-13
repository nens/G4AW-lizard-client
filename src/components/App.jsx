import React from 'react';
import { Provider } from 'react-redux';
import { Route } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import { theStore } from '../store/configureStore';
import MapComponent from './MapComponent';

export const app = (
  <Provider store={theStore}>
    <Router>
      <Route path="/" component={MapComponent} />
    </Router>
  </Provider>
);
