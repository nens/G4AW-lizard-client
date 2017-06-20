import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { translate } from "react-i18next";
import styles from "../styles/PhotoView.css";
import MDSpinner from "react-md-spinner";
import { changeView } from "../../actions/UiActions";

///////////////////////////////////////////////////////////////////////////////
// The main Component; the PhotoView component ////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

class PhotoViewComponent extends Component {
  constructor() {
    super();
    this.state = {
      imageStatus: "loading",
      topPanelHeight: null,
      bottomPanelHeight: null
    };
    this.handleImageLoaded = this.handleImageLoaded.bind(this);
  }
  componentDidMount() {
    const topPanelElement = ReactDOM.findDOMNode(this.topPanelElement);
    const bottomPanelElement = ReactDOM.findDOMNode(this.bottomPanelElement);
    this.setState({
      midPanelHeight: this.props.height -
        (topPanelElement.clientHeight + bottomPanelElement.clientHeight)
    });
  }
  handleImageLoaded() {
    this.setState({
      imageStatus: "loaded"
    });
  }
  render() {
    const { photo, handleBackButtonClick, width } = this.props;
    const { imageStatus } = this.state;
    const datetime = new Date(photo.date).toString();

    return (
      <div>
        <div className={styles.DetailViewPhotoInner} style={{ height, width }}>
          <PhotoViewTopPanel
            ref={elem => (this.topPanelElement = elem)}
            handleBackButtonClick={handleBackButtonClick}
          />
          <PhotoViewMidPanel
            url={photo.url}
            width={width}
            height={this.state.midPanelHeight}
            handleImageLoaded={this.handleImageLoaded}
          />
          <PhotoViewBottomPanel
            ref={elem => (this.bottomPanelElement = elem)}
            datetime={datetime}
          />
        </div>
        {imageStatus === "loading" ? <PhotoViewSpinner /> : null}
      </div>
    );
  }
}

///////////////////////////////////////////////////////////////////////////////
// type-checking: /////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

PhotoViewComponent.propTypes = {
  photo: PropTypes.object,
  handleBackButtonClick: PropTypes.func
};

///////////////////////////////////////////////////////////////////////////////
// Local sub-components: //////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

class PhotoViewTopPanel extends Component {
  render() {
    const { handleBackButtonClick } = this.props;
    return (
      <div className={styles.TopPanel}>
        <div onClick={handleBackButtonClick} className={styles.BackButton}>
          <i className="material-icons">arrow_back</i>
        </div>
      </div>
    );
  }
}

class PhotoViewMidPanel extends Component {
  render() {
    const { url, width, height, handleImageLoaded } = this.props;
    return (
      <div className={styles.PhotoPanel}>
        <div className={styles.DetailViewPhoto}>
          <img
            src={url}
            width={width}
            height={height}
            onLoad={handleImageLoaded}
          />
        </div>
      </div>
    );
  }
}

class PhotoViewBottomPanel extends Component {
  render() {
    const { datetime } = this.props;
    return (
      <div className={styles.PhotoPropertiesPanel}>
        <div className={styles.PhotoProperties}>
          <p className={styles.General}>General</p>
          <table className={styles.PropertiesTable}>
            <tbody>
              <tr>
                <td className={styles.PropertiesTableFirstColumn}>
                  Date taken
                </td>
                <td>{datetime}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

class PhotoViewSpinner extends Component {
  render() {
    return (
      <div>
        <MDSpinner
          singleColor="#03a9f4"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%"
          }}
        />
      </div>
    );
  }
}

///////////////////////////////////////////////////////////////////////////////
// react-redux bindings ///////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

function mapDispatchToProps(dispatch) {
  return {
    handleBackButtonClick: () => changeView(dispatch, "DetailView")
  };
}

const PhotoView = connect(null, mapDispatchToProps)(PhotoViewComponent);

export default translate()(PhotoView);
