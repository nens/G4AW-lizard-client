import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import styles from "./styles/Modal.css";

// A Modal component.

class Modal extends Component {
  constructor() {
    super();
    this.state = {
      width: window.innerWidth,
      height: window.innerHeight
    };
    this.updateDimensions = this.updateDimensions.bind(this);
  }
  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions);
  }
  updateDimensions() {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight
    });
  }
  render() {
    const { actionButtons, open, children, title } = this.props;
    const { width, height } = this.state;
    if (open) {
      return (
        <div className={styles.Modal} style={{ width, height }}>
          <div className={styles.ModalContent}>
            <h2 className={styles.Title}>{title}</h2>
            {children}
            <div className={styles.ActionButtons}>
              {actionButtons.map(button => {
                return <div className={styles.ButtonWrapper}>{button}</div>;
              })}
            </div>
          </div>
        </div>
      );
    } else {
      return <div />;
    }
  }
}

Modal.propTypes = {
  open: PropTypes.bool,
  title: PropTypes.string,
  children: PropTypes.any
};

export default Modal;
