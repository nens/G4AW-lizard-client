import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

import { ShowRastersMap } from './ShowRastersMap';
import SearchBarComponent from './SearchBarComponent';


export default class MapComponent extends Component {
  constructor () {
    super();
    this.state = {
      viewportWidth: window.innerWidth,
      viewportHeight: window.innerHeigth,
    };
  }
  componentDidMount () {
    window.addEventListener('resize', () => {
      this.setState({
        'viewportWidth': window.innerWidth,
        'viewportHeight': window.innerHeight
      });
      console.log("resize detected; this.state =", this.state);
    });
  }
  render () {
    return (
      <div>
        <ShowRastersMap
          width={this.state.viewportWidth}
          height={this.state.viewportHeight} />
        <SearchBarComponent />
      </div>
    );
  }
}
