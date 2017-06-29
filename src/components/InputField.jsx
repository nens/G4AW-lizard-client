import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import styles from "./styles/InputField.css";

// A InputField component.

class InputField extends Component {
  constructor() {
    super();
    this.state = {
      isActive: false,
      textValue: ""
    };
    this.handleOnFocus = this.handleOnFocus.bind(this);
    this.handleOnBlur = this.handleOnBlur.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }
  componentDidMount() {}
  handleOnFocus() {
    this.setState({
      isActive: true
    });
  }
  handleOnBlur() {
    this.setState({
      isActive: false
    });
  }
  handleKeyDown(e) {
    if (e.key === "Enter") {
      this.props.handleInputSubmit;
    }
    this.setState({
      textValue: e.target.value
    });
  }
  render() {
    const { hintText, type } = this.props;
    return (
      <div className={styles.InputField}>
        {this.state.textValue.length > 0
          ? ""
          : <div className={styles.HintText}>{hintText}</div>}
        <input
          ref="inputField"
          type={type === "password" ? "password" : "text"}
          onFocus={this.handleOnFocus}
          onBlur={this.handleOnBlur}
          onKeyUp={this.handleKeyDown}
        />
        <div>
          <hr className={styles.InputInactiveIndicator} />
          <hr
            className={styles.InputActiveIndicator}
            style={{
              transform: `scaleX(${this.state.isActive ? 1 : 0})`
            }}
          />
        </div>
      </div>
    );
  }
}

InputField.propTypes = {
  hintText: PropTypes.string,
  type: PropTypes.string
};

export default InputField;
