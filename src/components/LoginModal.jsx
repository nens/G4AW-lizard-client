import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import { translate } from "react-i18next";
import { Modal, LoginModalButtons, LoginModalContent } from ".";

///////////////////////////////////////////////////////////////////////////////
// The main Component; a component representing the non-generic login modal: //
///////////////////////////////////////////////////////////////////////////////

class LoginModal extends Component {
  render() {
    const { handleCancel, handleLogin, isOpen } = this.props;
    return (
      <Modal isOpen={isOpen} title={t("Login")}>
        <LoginModalContent />
        <LoginModalButtons
          handleCancel={handleCancel}
          handleLogin={handleLogin}
        />
      </Modal>
    );
  }
}

export default translate()(LoginModal);
