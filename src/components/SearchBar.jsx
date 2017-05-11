import { connect } from "react-redux";
import { translate } from "react-i18next";
import React, { Component, PropTypes } from "react";
import ReactDOM from "react-dom";
import styles from "./styles/SearchBarComponent.css";
import { doSearch, clearResults } from "../actions/SearchActions";

class SearchBarComponent extends Component {
  render() {
    const { t } = this.props;
    // Use as such in jsx: {t("test")}
    return (
      <div className={styles["searchbar-container"]}>
        <form onSubmit={this.props.search}>
          <input className={styles["searchbar-btn"]} type="button" value="0" />
          <input className={styles["searchbar-btn"]} type="button" value="+" />
          <input
            id="searchInputField"
            type="text"
            defaultValue="Utrecht"
            disabled={this.props.searchFetching}
            className={styles["searchbar-input"]}
          />
        </form>
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
    search: event => {
      event.preventDefault();
      let q = document.getElementById("searchInputField").value;

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

export default translate()(SearchBar);
