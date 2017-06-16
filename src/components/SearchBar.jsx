import { connect } from "react-redux";
import { translate } from "react-i18next";
import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import styles from "./styles/SearchBar.css";
import { doSearch, clearResults } from "../actions/SearchActions";

class ClearInputButton extends Component {
  render() {
    return (
      <div onClick={this.props.onClick}>
        <i className={`${styles.ClearInput} material-icons`}>clear</i>
      </div>
    );
  }
}

class SearchBarComponent extends Component {
  constructor() {
    super();
    this.state = {
      q: ""
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleClearInput = this.handleClearInput.bind(this);
  }
  handleSearch(e) {
    this.setState({
      q: e.target.value
    });
    if (e.key === "Enter") {
      this.props.search(e.target.value);
    }
  }
  handleClearInput() {
    this.setState({
      q: ""
    });
    this.refs.searchInputField.value = "";
    this.props.search("");
  }
  render() {
    return (
      <div className={styles.SearchBar}>
        <div className={styles.SettingsButton}>
          <i className={`${styles.SettingsIcon} material-icons`}>settings</i>
        </div>
        <input
          id="searchInputField"
          ref="searchInputField"
          type="text"
          disabled={this.props.searchFetching}
          onKeyUp={this.handleSearch}
          className={styles.SearchbarInput}
        />
        {this.state.q.length > 0
          ? <ClearInputButton onClick={this.handleClearInput} />
          : null}
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
