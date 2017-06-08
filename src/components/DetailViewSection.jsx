import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import CollapsibleBar from "./CollapsibleBar";
import styles from "./styles/DetailViewSection.css";

///////////////////////////////////////////////////////////////////////////////
// The main Component; the (generic) DetailViewSection ////////////////////////
// The final form of these components will be rely heavy on the value of //////
// 'this.props.children' property, as declared in the wrapping Component. /////
//                                                                           //
// Currently, the following non-generic instantiations are possible: //////////
// 1) DetailViewTableSection
// 2) DetailViewThumbnailsSection
///////////////////////////////////////////////////////////////////////////////

export default class DetailViewSection extends Component {
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
      isOpen
    } = this.props;
    const content = isOpen ? children : null;
    return (
      <div className={styles.DetailViewSection} onClick={handleClick}>
        <CollapsibleBar
          title={title}
          subTitle={subtitle}
          colorCode={colorCode}
          isOpen={isOpen}
        />
        {content}
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
