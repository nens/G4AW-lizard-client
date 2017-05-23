import { connect } from "react-redux";
import { translate } from "react-i18next";
import Ink from "react-ink";
import PropTypes from "prop-types";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import SearchCardIcon from "./svg/SearchCardIcon.svg";
import styles from "./styles/SearchResultCard.css";

class SearchResultCard extends Component {
  constructor() {
    super();
    this.state = {
      mouseover: false
    };
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
  }
  handleMouseOver() {
    if (!this.state.mouseover) {
      this.setState({
        mouseover: true
      });
    }
  }
  handleMouseOut() {
    if (this.state.mouseover) {
      this.setState({
        mouseover: false
      });
    }
  }
  render() {
    const { title, subtitle, ripple, handleClick } = this.props;
    return (
      <div
        onClick={handleClick}
        className={`${styles.SearchResultCard} ${this.state.mouseover ? styles.Mouseover : styles.Mouseout}`}
        onMouseOver={this.handleMouseOver}
        onMouseOut={this.handleMouseOut}
      >
        <div>
          <img src={SearchCardIcon} className={styles.SearchCardIcon} />
        </div>
        <span className={styles.Title}>{title}</span>
        <div className={styles.SubTitle}>{subtitle}</div>
        {ripple === false ? "" : <Ink />}
      </div>
    );
  }
}

SearchResultCard.propTypes = {
  handleClick: PropTypes.func,
  subtitle: PropTypes.string,
  title: PropTypes.string
};

export default SearchResultCard;
