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
    this.state = {
      isOpen: this.props && this.props.isOpen
    };
    this.toggleSection = this.toggleSection.bind(this);
  }
  toggleSection() {
    this.setState({ isOpen: !this.state.isOpen });
  }
  componentDidMount() {}
  render() {
    const {
      children,
      colorCode,
      handleClick,
      title,
      subTitle,
      isOpen
    } = this.props;

    const toggleSection = this.toggleSection;
    const content = this.state.isOpen ? children : null;

    return (
      <div className={styles.DetailViewSection}>
        <CollapsibleBar
          title={title}
          subTitle={subTitle}
          colorCode={colorCode}
          handleClick={toggleSection}
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
