import Ink from "react-ink";
import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import {
  VelocityTransitionGroup,
  VelocityComponent,
  velocityHelpers
} from "velocity-react";

import styles from "./styles/TabBar";

// A TabBar component.

class Tab extends Component {
  constructor() {
    super();
    this.state = {};
  }
  componentDidMount() {}
  render() {
    const { title, idx, isSelected, handleTabClick } = this.props;
    return (
      <div
        className={`${styles.Tab} ${idx === isSelected ? styles.Active : ""}`}
        onClick={() => handleTabClick(idx)}
      >
        {title}
        <Ink />
      </div>
    );
  }
}

Tab.propTypes = {
  title: PropTypes.string,
  active: PropTypes.bool
};

class TabBar extends Component {
  constructor() {
    super();
    this.state = {};
    this.handleTabClick = this.handleTabClick.bind(this);
  }
  componentDidMount() {}
  handleTabClick(idx) {
    this.props.handleTabClick(idx);
  }
  render() {
    let tabContent = <div />;
    const { children, handleTabClick, isSelected } = this.props;

    if (children && isSelected < children.length) {
      tabContent = <div> {children[isSelected].props.children} </div>;
    }

    const childrenWithProps = React.Children.map(children, (child, i) => {
      return React.cloneElement(child, {
        idx: i,
        isSelected: isSelected,
        handleTabClick: this.handleTabClick
      });
    });

    return (
      <div className={styles.TabWrapper}>
        <div className={styles.TabBar}>{childrenWithProps}</div>
        <div className={styles.TabContent}>{tabContent}</div>
      </div>
    );
  }
}

TabBar.propTypes = {
  children: PropTypes.array,
  handleTabClick: PropTypes.func,
  isSelected: PropTypes.number
};

export { TabBar, Tab };
