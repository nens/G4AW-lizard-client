import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import { translate, t } from "react-i18next";

import styles from "./styles/DetailViewFooter.css";

import { selectPreviousParcel, selectNextParcel } from "../actions";

class DetailViewFooterComponent extends Component {
  getPageIndication() {
    if (this.props.searchResults) {
      const currentIndex = this.props.searchResults.indexOf(
        this.props.selectedParcel
      );
      const count = this.props.searchResults.length;
      return `${currentIndex + 1}/${count}`;
    } else {
      return "1/1";
    }
  }
  render() {
    return (
      <div className={styles.Wrapper}>
        <PrevParcelButton handleClick={this.props.showPrev} />
        <span className={styles.PageIndicator}>
          {this.getPageIndication()}
        </span>
        <NextParcelButton handleClick={this.props.showNext} />
      </div>
    );
  }
}

class PrevParcelButton extends Component {
  render() {
    const { handleClick } = this.props;
    return (
      <div onClick={handleClick} className={styles.PrevParcelButton}>
        <i className="material-icons">keyboard_arrow_left</i>
      </div>
    );
  }
}

class NextParcelButton extends Component {
  render() {
    const { handleClick } = this.props;
    return (
      <div onClick={handleClick} className={styles.NextParcelButton}>
        <i className="material-icons">keyboard_arrow_right</i>
      </div>
    );
  }
}

DetailViewFooterComponent.propTypes = {
  showNext: PropTypes.func,
  showPrev: PropTypes.func
};

function mapStateToProps(state) {
  return {
    searchResults: state.search.results,
    selectedParcel: state.ui.selectedParcel
  };
}

function mapDispatchToProps(dispatch) {
  return {
    showPrev: () => selectPreviousParcel(dispatch),
    showNext: () => selectNextParcel(dispatch)
  };
}

const DetailViewFooter = connect(mapStateToProps, mapDispatchToProps)(
  DetailViewFooterComponent
);

export default translate()(DetailViewFooter);
