import { connect } from "react-redux";
import { translate } from "react-i18next";
import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";

import styles from "./styles/SearchBar.css";

import GeolocateButtonSmall from "./GeolocateButtonSmall";
import { changeView, updateMapBbox } from "../actions";

import { DEFAULT_BBOX } from "../constants/defaults";

import {
  doSearch,
  clearResults,
  setSearchInputText,
  performGeolocation,
  showSnackBar
} from "../actions";

/* the main omponent -- a search bar for MapSearchView/ListSearchView ********/

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
    if (e.target.value.length === 0) {
      this.props.clear();
    }
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
    const { searchInput, searchIsFetching, changeToSettingsView } = this.props;
    return (
      <div className={styles.SearchBar}>
        <SettingsButton handleClick={changeToSettingsView} />
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

function SettingsButton({ handleClick }) {
  return (
    <div className={styles.SettingsButton} onClick={handleClick}>
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
    changeToSettingsView: () => changeView(dispatch, "SettingsView"),
    setSearchInput: q => dispatch(setSearchInputText(q)),
    clear: () => {
      dispatch(clearResults());
      updateMapBbox(dispatch, DEFAULT_BBOX);
      showSnackBar(dispatch, {
        autoHideDuration: 3000,
        message: "You have cleared your search results.",
        subMessage: "Please search again."
      });
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
