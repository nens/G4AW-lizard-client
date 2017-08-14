import Ink from "react-ink";
import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import { translate } from "react-i18next";
import { connect } from "react-redux";
import styles from "./styles/LanguageChooser.css";

class LanguageChooserComponent extends Component {
  render() {
    const { t, selectedLanguage, selectLanguage } = this.props;
    return (
      <div>
        <div className={styles.SubHeaderContainer}>
          <h3 className={styles.SubHeaderText}>
            {t("Language")}
          </h3>
        </div>

        <div className={styles.LanguageSelection}>
          <div className={styles.Wrapper}>
            <LanguageButton
              selectedlanguage={selectedLanguage}
              acronym="VI"
              language="Vietnamese"
              handleClick={selectLanguage}
            />
            <LanguageButton
              selectedlanguage={selectedLanguage}
              acronym="EN"
              language="English"
              handleClick={selectLanguage}
            />
            <LanguageButton
              selectedlanguage={selectedLanguage}
              acronym="NL"
              language="Dutch"
              handleClick={selectLanguage}
            />
          </div>
        </div>
      </div>
    );
  }
}

function LanguageButton({ language, handleClick, acronym }) {
  return (
    <div onClick={handleClick} className={styles.LanguageButton}>
      <div className={styles.Acronym}>
        {acronym}
      </div>
      <div className={styles.TitleWrapper}>
        <span className={styles.Title}>
          {language}
        </span>
      </div>
      <Ink />
    </div>
  );
}

function mapStateToProps(state) {
  return {
    selectedLanguage: state.ui.selectedlanguage
  };
}

function mapDispatchToProps(dispatch) {
  return {
    selectLanguage: () => false
  };
}

const LanguageChooser = connect(mapStateToProps, mapDispatchToProps)(
  LanguageChooserComponent
);

export default LanguageChooser;
