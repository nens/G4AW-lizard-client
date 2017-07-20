import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import { CollapsibleBar } from ".";
import styles from "./styles/DetailViewSection.css";
import { VelocityComponent } from "velocity-react";

/*
DetailViewSection
-----------------
The final form of these components will be rely heavy on the value of
'this.props.children' property, as declared in the wrapping Component.

Currently, the following non-generic instantiations are possible:

1) DetailViewTableSection
2) DetailViewThumbnailsSection
*/

export default class DetailViewSection extends Component {
  constructor() {
    super();
    this.state = {
      isOpen: this.props && this.props.isOpen
    };
    this.toggleSection = this.toggleSection.bind(this);
  }
  componentDidMount() {
    this.setState({ isOpen: this.props.isOpen });
  }
  toggleSection() {
    this.setState({ isOpen: !this.state.isOpen });
  }
  render() {
    const {
      children,
      colorCode,
      handleClick,
      title,
      subTitle,
      isOpen
    } = this.props;

    return (
      <div className={styles.DetailViewSection}>
        <CollapsibleBar
          isOpen={this.state.isOpen}
          title={title}
          subTitle={subTitle}
          colorCode={colorCode}
          handleClick={this.toggleSection}
        />
        <div
          className={`${styles.CollapsibleContent} ${this.state.isOpen
            ? styles.ContentVisible
            : null}`}
        >
          {children || null}
        </div>
      </div>
    );
  }
}

DetailViewSection.propTypes = {
  handleClick: PropTypes.func,
  children: PropTypes.object,
  open: PropTypes.bool,
  title: PropTypes.string,
  subtitle: PropTypes.string
};
