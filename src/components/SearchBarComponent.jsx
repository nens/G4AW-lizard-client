import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import styles from './styles/SearchBarComponent.css';
import { doSearch, clearResults } from '../actions/SearchActions';

class SearchBarComponent extends Component {
  render() {
    return (
      <div className={styles['searchbar-container']}>
        <form onSubmit={this.props.search}>
          <input
              className={styles['searchbar-btn']}
              type='button'
              value='0'
          />
          <input
              className={styles['searchbar-btn']}
              type='button'
              value='+'
          />
          <input
              id="searchInputField"
              type='text'
              defaultValue='Utrecht'
              disabled={this.props.searchFetching}
              className={styles['searchbar-input']}
          />
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    'searchFetching': !!state.search.isFetching,
    'searchResults': state.search.isFetching ? null : state.search.results
  };
}

function mapDispatchToProps(dispatch) {
  return {
    search: (event) => {
      event.preventDefault();
      let q = document.getElementById('searchInputField').value;

      if (q) {
        doSearch(dispatch, q);
      } else {
        dispatch(clearResults());
      }
    }
  };
}

const SearchBar = connect(mapStateToProps, mapDispatchToProps)(SearchBarComponent);

export default SearchBar;
