import { connect } from "react-redux";
import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import styles from "./styles/SearchResultsComponent.css";

class SearchResultsComponent extends Component {
  render() {
    if (!this.props.results) {
      return null;
    }

    return (
      <div className={styles["searchresults-container"]}>
        <p>{this.props.results.size} results.</p>
        <ul>
          {this.props.results.map((result, idx) => (
            <li key={"searchresult-" + idx}>
              <p>{result.title}</p>
              <p className={styles["searchresults-description"]}>
                {result.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    results: state.search.results
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

const SearchResults = connect(mapStateToProps, mapDispatchToProps)(
  SearchResultsComponent
);
export default SearchResults;
