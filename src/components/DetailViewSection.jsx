import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import CollapsibleBar from "./CollapsibleBar";
import styles from "./styles/DetailViewSection.css";

///////////////////////////////////////////////////////////////////////////////
// The main Component; the DetailViewSection //////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

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

///////////////////////////////////////////////////////////////////////////////
// type-checking: /////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

DetailViewSection.propTypes = {
  handleClick: PropTypes.func,
  children: PropTypes.object,
  open: PropTypes.bool,
  title: PropTypes.string,
  subtitle: PropTypes.string
};

export default DetailViewSection;
