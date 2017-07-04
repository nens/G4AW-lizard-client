import React, { Component } from "react";
import ReactDOM from "react-dom";
import InputField from ".";
import { translate } from "react-i18next";

///////////////////////////////////////////////////////////////////////////////
// The main Component; non-generic component for the login modals content, ////
// i.e. everythin but the header/footer part and the buttons. /////////////////
///////////////////////////////////////////////////////////////////////////////

class LoginModalContent extends Component {
  render() {
    const { t } = this.props;
    return (
      <div>
        <p>
          {t("To view private data, please use your credentials to log in")}
        </p>
        <div>
          <InputField hintText={t("Username")} />
        </div>
        <div>
          <InputField hintText={t("Password")} type="password" />
        </div>
      </div>
    );
  }
}

export default translate()(LoginModalContent);
