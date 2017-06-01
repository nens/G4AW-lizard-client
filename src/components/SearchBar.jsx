import { connect } from "react-redux";
import { translate } from "react-i18next";
import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import styles from "./styles/SearchBar.css";
import { doSearch, clearResults } from "../actions/SearchActions";

class SearchBarComponent extends Component {
  constructor() {
    super();
    this.state = {};
    this.handleSearch = this.handleSearch.bind(this);
  }
  handleSearch(e) {
    if (e.key === "Enter") {
      this.props.search(e.target.value);
    }
  }
  render() {
    return (
      <div className={styles.SearchBar}>
        <div className={styles.SettingsButton}>
          <i className={`${styles.SettingsIcon} material-icons`}>settings</i>
        </div>
        <input
          id="searchInputField"
          type="text"
          disabled={this.props.searchFetching}
          onKeyPress={this.handleSearch}
          className={styles.SearchbarInput}
        />
        <div className={styles.GeoLocateButton}>
          <i className={`${styles.GeoLocateIcon} material-icons`}>near_me</i>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    searchFetching: !!state.search.isFetching,
    searchResults: state.search.isFetching ? null : state.search.results
  };
}

function mapDispatchToProps(dispatch) {
  return {
    search: q => {
      if (q) {
        doSearch(dispatch, q);
      } else {
        dispatch(clearResults());
      }
    }
  };
}

const SearchBar = connect(mapStateToProps, mapDispatchToProps)(
  SearchBarComponent
);

export default SearchBar;
