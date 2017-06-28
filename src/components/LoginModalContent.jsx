import React, { Component } from "react";
import ReactDOM from "react-dom";
import InputField from ".";

///////////////////////////////////////////////////////////////////////////////
// The main Component; non-generic component for the login modals content, ////
// i.e. everythin but the header/footer part and the buttons. /////////////////
///////////////////////////////////////////////////////////////////////////////

export default class LoginModalContent extends Component {
  render() {
    return (
      <div>
        <p>To view private data, please use your credentials to log in</p>
        <div>
          <InputField hintText="Username" />
        </div>
        <div>
          <InputField hintText="Password" type="password" />
        </div>
      </div>
    );
  }
}
