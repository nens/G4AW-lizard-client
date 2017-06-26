import { connect } from "react-redux";
import { translate } from "react-i18next";
import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import styles from "./styles/SearchBar.css";
import GeolocateButtonSmall from "./GeolocateButtonSmall";
import {
  doSearch,
  clearResults,
  setSearchInputText
} from "../actions/SearchActions";
import { performGeolocation } from "../actions/GeolocationActions";

class SearchBarComponent extends Component {
  constructor() {
    super();
    this.state = { q: null };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleClearInput = this.handleClearInput.bind(this);
  }
  handleSearch(e) {
    const { setSearchInput, search } = this.props;
    setSearchInput(e.target.value);
    if (e.target.value.length > 0 && e.key === "Enter") {
      search(e.target.value);
    }
  }
  handleClearInput() {
    this.setState({ q: null });
    document.getElementById("searchInputField").value = null;
    this.props.clear();
  }
  render() {
    const { searchInput, searchIsFetching } = this.props;
    return (
      <div className={styles.SearchBar}>
        <SettingsButton />
        <SearchField
          searchInput={searchInput}
          searchIsFetching={searchIsFetching}
          handleSearch={this.handleSearch}
          handleClearInput={this.handleClearInput}
        />
        <GeolocateButtonSmall />
      </div>
    );
  }
}

/* local sub-components ******************************************************/

function SettingsButton() {
  return (
    <div className={styles.SettingsButton}>
      <i className={`${styles.SettingsIcon} material-icons`}>settings</i>
    </div>
  );
}

class SearchField extends Component {
  render() {
    const {
      searchInput,
      searchIsFetching,
      handleSearch,
      handleClearInput
    } = this.props;

    return (
      <div>
        <input
          id="searchInputField"
          ref="searchInputField"
          type="text"
          defaultValue={searchInput}
          disabled={searchIsFetching}
          onKeyUp={handleSearch}
          className={styles.SearchbarInput}
        />
        {searchInput && searchInput.length > 0
          ? <ClearInputButton onClick={handleClearInput} />
          : null}
      </div>
    );
  }
}

class ClearInputButton extends Component {
  render() {
    return (
      <div onClick={this.props.onClick}>
        <i className={`${styles.ClearInput} material-icons`}>clear</i>
      </div>
    );
  }
}

/* react-redux coupling ******************************************************/

function mapStateToProps(state) {
  return {
    searchIsFetching: !!state.search.isFetching,
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
