import { connect } from "react-redux";
import { translate } from "react-i18next";
import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import styles from "./styles/SearchBar.css";
import {
  doSearch,
  clearResults,
  setSearchInputText
} from "../actions/SearchActions";

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
    const { setSearchInput } = this.props;
    setSearchInput(e.target.value);

    if (e.target.value.length > 0 && e.key === "Enter") {
      this.props.search(e.target.value);
    }
  }
  handleClearInput() {
    this.setState({
      q: ""
    });
    this.refs.searchInputField.value = "";
    this.props.clear();
  }
  render() {
    const { searchInput } = this.props;
    return (
      <div className={styles.SearchBar}>
        <div className={styles.SettingsButton}>
          <i className={`${styles.SettingsIcon} material-icons`}>settings</i>
        </div>
        <input
          id="searchInputField"
          ref="searchInputField"
          type="text"
          defaultValue={searchInput}
          disabled={this.props.searchFetching}
          onKeyUp={this.handleSearch}
          className={styles.SearchbarInput}
        />
        {searchInput && searchInput.length > 0
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
    searchInput: state.search.inputText,
    searchResults: state.search.isFetching ? null : state.search.results
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setSearchInput: q => {
      dispatch(setSearchInputText(q));
    },
    clear: () => {
      dispatch(clearResults());
    },
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
