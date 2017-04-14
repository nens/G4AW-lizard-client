import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import styles from './styles/SearchBarComponent.css';

export default class SearchBarComponent extends Component {
  render () {
    return (

      <div className={styles["searchbar-container"]}>
        <input
          className={styles['searchbar-btn-menu']}
          type="button"
          value="0"
        />
        <input
          className={styles['searchbar-btn-search']}
          type="button"
          value="+"
        />
        <input
          type="text"
          defaultValue="Utrecht"
          className={styles["searchbar"]}
        />
      </div>
    );
  }
}