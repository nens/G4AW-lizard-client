import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import styles from "./styles/HeaderBar.css";

// A HeaderBar component.

class HeaderBar extends Component {
  constructor() {
    super();
    this.state = {};
  }
  componentDidMount() {}
  render() {
    const { title, icon, handleClick } = this.props;
    return (
      <div className={styles.HeaderBar}>
        <span className={styles.Title}>{title}</span>
        <div className={styles.ActionButton} onClick={handleClick}>
          <i className={`${styles.ActionButtonIcon} material-icons`}>{icon}</i>
        </div>
      </div>
    );
  }
}

HeaderBar.propTypes = {
  handleClick: PropTypes.func,
  icon: PropTypes.string,
  title: PropTypes.string
};

export default HeaderBar;
