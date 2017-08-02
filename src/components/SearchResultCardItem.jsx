import { translate } from "react-i18next";
import Ink from "react-ink";
import { CSSTransitionGroup } from "react-transition-group";
import PropTypes from "prop-types";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import styles from "./styles/SearchResultCardItem.css";

class SearchResultCardItem extends Component {
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
  extractName(fullTitle) {
    const startOfSuffix = fullTitle.indexOf("(");
    return fullTitle.slice(0, startOfSuffix).replace("Farmer", "");
  }
  extractFarmId(fullTitle) {
    const fullTitleParts = fullTitle.split(" ");
    const lastPart = fullTitleParts[fullTitleParts.length - 1];
    const RE = /[\d\-]+/;
    return RE.exec(lastPart)[0];
  }
  render() {
    const { ripple, handleClick, indicatorColor, subtitle, title } = this.props;
    const farmerName = this.extractName(title);
    const farmId = this.extractFarmId(title);

    return (
      <div
        id="SearchResultCardItem"
        onClick={handleClick}
        className={`${styles.SearchResultCardItem} ${this.state.mouseover
          ? styles.Mouseover
          : styles.Mouseout}`}
        onMouseOver={this.handleMouseOver}
        onMouseOut={this.handleMouseOut}
      >
        <div>
          <svg
            width="18px"
            height="18px"
            viewBox="0 0 18 18"
            className={styles.SearchCardIcon}
          >
            <g
              transform="translate(-27.000000, -169.000000)"
              fill={indicatorColor || "#D8D8D8"}
            >
              <g
                id="searchresult-card"
                transform="translate(14.000000, 159.000000)"
              >
                <circle id="" cx="22" cy="19" r="9" />
              </g>
            </g>
          </svg>
        </div>
        <span className={styles.Title}>
          {farmerName}
        </span>
        <div className={styles.SubTitle}>
          {farmId}
        </div>
        {ripple ? <Ink /> : ""}
      </div>
    );
  }
}

SearchResultCardItem.propTypes = {
  indicatorColor: PropTypes.string,
  handleClick: PropTypes.func,
  subtitle: PropTypes.string,
  title: PropTypes.string
};

export default SearchResultCardItem;
