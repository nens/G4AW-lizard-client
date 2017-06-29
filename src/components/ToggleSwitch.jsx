import React, { Component, PropTypes } from "react";

import styles from "./styles/ToggleSwitch.css";

/* The main Component; a reusable ToggleSwitch *******************************/

class ToggleSwitch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: this.props.defaultSelected ? true : false
    };
    this.handleToggleSwitch = this.handleToggleSwitch.bind(this);
  }
  handleToggleSwitch(e) {
    this.setState({
      selected: e.target.checked
    });
    this.props.onChange(e.target.checked);
  }
  render() {
    const randId = Math.random().toString(36).substring(7);
    return (
      <div className={styles.ToggleSwitchWrapper}>
        <span>{this.props.labelText}</span>
        <div className={styles.ToggleSwitch} onChange={this.handleToggleSwitch}>
          <ToggleSwitchInput randId={randId} isChecked={this.state.selected} />
          <ToggleSwitchLabel
            randId={randId}
            isChecked={this.state.selected}
            texts={{
              on: this.props.labelOnText,
              off: this.props.labelOffText
            }}
          />
        </div>
      </div>
    );
  }
}

///////////////////////////////////////////////////////////////////////////////
// type-checking the main Component's props ///////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

ToggleSwitch.propTypes = {
  switchState: PropTypes.any,
  labelOnText: PropTypes.string,
  labelOffText: PropTypes.string
};

///////////////////////////////////////////////////////////////////////////////
// local sub-components ///////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

class ToggleSwitchInput extends Component {
  render() {
    const { randId, isChecked } = this.props;
    return (
      <input
        type="checkbox"
        name="toggle-switch"
        id={randId}
        defaultChecked={isChecked}
        className={styles.ToggleSwitchCheckbox}
      />
    );
  }
}

class ToggleSwitchLabel extends Component {
  render() {
    const { randId, isChecked, texts } = this.props;
    const labelText = texts[isChecked ? "on" : "off"];
    return (
      <label className={styles.ToggleSwitchLabel} htmlFor={randId}>
        <span className={styles.ToggleSwitchText}>{labelText}</span>
        <span className={styles.ToggleSwitchInner} />
      </label>
    );
  }
}

export default ToggleSwitch;
