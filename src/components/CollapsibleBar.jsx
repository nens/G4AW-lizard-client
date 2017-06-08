import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import styles from "./styles/CollapsibleBar.css";

// A CollapsibleBar component.

class CollapsibleBar extends Component {
  render() {
    const {
      colorCode,
      title,
      subTitle,
      icon,
      handleClick,
      isOpen
    } = this.props;
    return (
      <div className={styles.CollapsibleBar} onClick={handleClick}>
        <i className={`${styles.Arrow} material-icons`}>
          {isOpen ? "keyboard_arrow_down" : "keyboard_arrow_right"}
        </i>
        <span className={styles.Title}>{title}</span>
        {subTitle
          ? <span className={styles.Subtitle}>{subTitle}</span>
          : <span className={styles.ColorCode}>

              <svg width="20px" height="20px" viewBox="0 0 20 20">
                <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                  <circle fill={colorCode} cx="10" cy="10" r="10" />
                </g>
              </svg>

            </span>}
      </div>
    );
  }
}

CollapsibleBar.propTypes = {
  colorCode: PropTypes.string,
  handleClick: PropTypes.func,
  isOpen: PropTypes.bool,
  subTitle: PropTypes.string,
  title: PropTypes.string
};

export default CollapsibleBar;
