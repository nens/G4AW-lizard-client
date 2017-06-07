import Ink from "react-ink";
import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import styles from "./styles/TabBar.css";

import {
  VelocityTransitionGroup,
  VelocityComponent,
  velocityHelpers
} from "velocity-react";

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
        onClick={handleTabClick}
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
  }
  componentDidMount() {}
  render() {
    let tabContent = <div />;
    const { children, isSelected } = this.props;

    if (children && isSelected < children.length) {
      tabContent = (
        <div>
          {children[isSelected].props.children}
        </div>
      );
    }

    const childrenWithProps = React.Children.map(children, (child, i) => {
      return React.cloneElement(child, {
        idx: i,
        isSelected: isSelected
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
  isSelected: PropTypes.number
};

export { TabBar, Tab };
