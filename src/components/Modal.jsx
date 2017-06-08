import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import styles from "./styles/Modal.css";

///////////////////////////////////////////////////////////////////////////////
// The main Component; a generic component for modals /////////////////////////
///////////////////////////////////////////////////////////////////////////////

// TODO: Receive width/height values from a wrapping component via props,
//       instead of calculating them here locally (which isn't DRY: better do
//       everything related to "dimensions" in the top-level component and pass
//       it down the component hierarchy from there).

class Modal extends Component {
  constructor() {
    super();
    this.state = {
      width: window.innerWidth,
      height: window.innerHeight,
      mounted: false
    };
    this.updateDimensions = this.updateDimensions.bind(this);
  }
  componentDidMount() {
    this.setState({ mounted: true });
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions);
  }
  componentWillUnmount() {
    this.setState({ mounted: false });
  }
  updateDimensions() {
    if (this.state.mounted) {
      this.setState({
        width: window.innerWidth,
        height: window.innerHeight
      });
    }
  }
  render() {
    const { actionButtons, isOpen, children, title } = this.props;
    const { width, height } = this.state;
    if (!isOpen) return null;
    return (
      <div className={styles.Modal} style={{ width, height }}>
        <div className={styles.ModalInner}>
          <h2 className={styles.Title}>{title}</h2>
          {children}
        </div>
      </div>
    );
  }
}

///////////////////////////////////////////////////////////////////////////////
// type-checking for the main Component ///////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

Modal.propTypes = {
  open: PropTypes.bool,
  title: PropTypes.string,
  children: PropTypes.any
};

export default Modal;
