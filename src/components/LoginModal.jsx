import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";

import Modal from "./Modal";
import LoginModalContent from "./LoginModalContent";
import LoginModalButtons from "./LoginModalButtons";

///////////////////////////////////////////////////////////////////////////////
// The main Component; a component representing the non-generic login modal: //
///////////////////////////////////////////////////////////////////////////////

export default class LoginModal extends Component {
  render() {
    const { handleCancel, handleLogin, isOpen } = this.props;
    return (
      <Modal isOpen={isOpen} title="Login">
        <LoginModalContent />
        <LoginModalButtons
          handleCancel={handleCancel}
          handleLogin={handleLogin}
        />
      </Modal>
    );
  }
}
