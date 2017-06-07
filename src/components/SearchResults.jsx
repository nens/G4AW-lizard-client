import { connect } from "react-redux";
import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import styles from "./styles/SearchResultsComponent.css";
import { getAttributesFromGeoserver } from "../actions/ParcelActions";

class SearchResultsComponent extends Component {
  render() {
    if (!this.props.results) {
      return null;
    }

    return (
      <div className={styles["searchresults-container"]}>
        <p>{this.props.results.length} results.</p>
        <ul>
          {this.props.results.map((result, idx) =>
            <li
              key={"searchresult-" + idx}
              onClick={() => this.props.clickResult(result)}
            >
              <p>{this.props.parcels[result].name}</p>
              {this.renderResult(result)}
            </li>
          )}
        </ul>
      </div>
    );
  }

  renderResult(result) {
    const parcel = this.props.parcels[result];

    if (!parcel) return;

    if (parcel.isFetchingGeoserver) return <p>Spinner.</p>;

    if (!parcel.hasGeoserverData) return;

    return <p>{JSON.stringify(parcel)}</p>;
  }
}

function mapStateToProps(state) {
  return {
    results: state.search.results,
    parcels: state.parcels
  };
}

function mapDispatchToProps(dispatch) {
  return {
    clickResult: result => getAttributesFromGeoserver(dispatch, result)
  };
}

const SearchResults = connect(mapStateToProps, mapDispatchToProps)(
  SearchResultsComponent
);
export default SearchResults;
