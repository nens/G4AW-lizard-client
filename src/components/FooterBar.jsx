import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import styles from "./styles/FooterBar";

// A FooterBar component.

class FooterBar extends Component {
  constructor() {
    super();
    this.state = {};
  }
  componentDidMount() {}
  render() {
    const { children } = this.props;
    return (
      <div className={styles.FooterBarWrapper}>
        <div className={styles.FooterBar}>
          {children}
        </div>
      </div>
    );
  }
}

FooterBar.propTypes = {
  children: PropTypes.any
};

export default FooterBar;
