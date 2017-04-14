import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import styles from './styles/SearchBarComponent.css';

export default class SearchBarComponent extends Component {
  render () {
    return (

     // HIER WAS IK.....
     //<div className={`${styles.SearchbarContainer} ${styles.SearchbarButton}`}>

      <div className={styles["searchbar-container"]}>
        <input
          className={styles['searchbar-btn']}
          type="button"
          value="0"
        />
        <input
          className={styles['searchbar-btn']}
          type="button"
          value="+"
        />
        <input
          type="text"
          defaultValue="Utrecht"
          className={styles["searchbar-input"]}
        />
      </div>
    );
  }
}