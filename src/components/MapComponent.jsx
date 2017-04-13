import React, { Component, PropTypes } from 'react';
import { ShowRastersMap } from './ShowRastersMap';
import ReactDOM from 'react-dom';

export class MapComponent extends Component {
  render () {
    return (
      <div>
        <h2>Heh.</h2>
        <ShowRastersMap />
      </div>
    );
  }
}
