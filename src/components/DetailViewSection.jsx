import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import CollapsibleBar from "./CollapsibleBar";
import styles from "./styles/DetailViewSection.css";

// A DetailViewSection component.

class DetailViewSection extends Component {
  constructor() {
    super();
    this.state = {};
  }
  componentDidMount() {}
  render() {
    const {
      children,
      colorCode,
      handleClick,
      title,
      subtitle,
      open
    } = this.props;
    return (
      <div className={styles.DetailViewSection} onClick={handleClick}>
        <CollapsibleBar
          title={title}
          subTitle={subtitle}
          colorCode={colorCode}
          open={open}
        />
        {open ? children : ""}
      </div>
    );
  }
}

DetailViewSection.propTypes = {
  handleClick: PropTypes.func,
  children: PropTypes.any,
  open: PropTypes.bool,
  title: PropTypes.string,
  subtitle: PropTypes.string
};

export default DetailViewSection;
