import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

import { ShowRastersMap } from './ShowRastersMap';
import SearchBarComponent from './SearchBarComponent';

export default class MapComponent extends Component {
  render () {
    return (
      <div>
        <h2>Heh.</h2>
        <SearchBarComponent />
        <ShowRastersMap />
      </div>
    );
  }
}
