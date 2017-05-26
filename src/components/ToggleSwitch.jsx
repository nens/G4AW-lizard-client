import styles from "./styles/ToggleSwitch.css";
import React, { Component, PropTypes } from "react";

class ToggleSwitch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: this.props.defaultSelected ? true : false
    };
    this._handleToggleSwitch = this._handleToggleSwitch.bind(this);
  }

  _handleToggleSwitch(e) {
    this.setState({
      selected: e.target.checked
    });
    this.props.onChange(e.target.checked);
  }

  render() {
    const randId = Math.random().toString(36).substring(7);
    const { labelText } = this.props;
    return (
      <div className={styles.ToggleSwitchWrapper}>
        <span>{this.props.labelText}</span>
        <div
          className={styles.ToggleSwitch}
          onChange={this._handleToggleSwitch}
        >
          <input
            type="checkbox"
            name="toggle-switch"
            id={randId}
            checked={this.state.selected ? "CHECKED" : ""}
            className={styles.ToggleSwitchCheckbox}
          />
          <label className={styles.ToggleSwitchLabel} htmlFor={randId}>
            <span className={styles.ToggleSwitchText}>
              {this.state.selected === true
                ? this.props.labelOnText
                : this.props.labelOffText}
            </span>
            <span className={styles.ToggleSwitchInner} />
          </label>
        </div>
      </div>
    );
  }
}

ToggleSwitch.propTypes = {
  switchState: PropTypes.any,
  labelOnText: PropTypes.string,
  labelOffText: PropTypes.string
};

export default ToggleSwitch;
