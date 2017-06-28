import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import styles from "./styles/Modal";

import { WIDTH, HEIGHT } from "../tools/dimensions";

///////////////////////////////////////////////////////////////////////////////
// The main Component; a generic component for modals /////////////////////////
///////////////////////////////////////////////////////////////////////////////

class Modal extends Component {
  constructor() {
    super();
    this.state = { mounted: false };
  }
  componentDidMount() {
    this.setState({ mounted: true });
  }
  componentWillUnmount() {
    this.setState({ mounted: false });
  }
  render() {
    if (!this.props.isOpen) return null;
    const { actionButtons, isOpen, children, title } = this.props;
    const dimensions = { width: WIDTH, height: HEIGHT };
    return (
      <div className={styles.Modal} style={dimensions}>
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
  isOpen: PropTypes.bool,
  title: PropTypes.string,
  children: PropTypes.any
};

export default Modal;
