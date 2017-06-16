import { translate } from "react-i18next";
import Ink from "react-ink";
import { CSSTransitionGroup } from "react-transition-group";
import PropTypes from "prop-types";
import React, { Component } from "react";
import ReactDOM from "react-dom";
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
    const { title, subtitle, ripple, handleClick, indicatorColor } = this.props;
    return (
      <CSSTransitionGroup
        transitionName={{
          enter: styles.Enter,
          enterActive: styles.EnterActive,
          leave: styles.Leave,
          leaveActive: styles.LeaveActive,
          appear: styles.Appear,
          appearActive: styles.AppearActive
        }}
        transitionAppear={true}
        transitionAppearTimeout={500}
        transitionEnter={false}
        transitionLeave={false}
      >
        <div
          id="SearchResultCard"
          onClick={handleClick}
          className={`${styles.SearchResultCard} ${this.state.mouseover ? styles.Mouseover : styles.Mouseout}`}
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
          <span className={styles.Title}>{title}</span>
          <div className={styles.SubTitle}>{subtitle}</div>
          {ripple === false ? "" : <Ink />}
        </div>
      </CSSTransitionGroup>
    );
  }
}

SearchResultCard.propTypes = {
  indicatorColor: PropTypes.string,
  handleClick: PropTypes.func,
  subtitle: PropTypes.string,
  title: PropTypes.string
};

export default SearchResultCard;
