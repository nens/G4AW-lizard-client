import Ink from "react-ink";
import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import { translate } from "react-i18next";
import { connect } from "react-redux";
import styles from "./styles/LanguageChooser.css";

import { selectLanguage } from "../actions";

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
              active={selectedLanguage === "vi"}
              acronym="VI"
              language={t("Vietnamese")}
              handleClick={selectLanguage}
            />
            <LanguageButton
              active={selectedLanguage !== "nl" && selectedLanguage !== "vi"}
              acronym="EN"
              language={t("English")}
              handleClick={selectLanguage}
            />
            <LanguageButton
              active={selectedLanguage === "nl"}
              selectedlanguage={selectedLanguage}
              acronym="NL"
              language={t("Dutch")}
              handleClick={selectLanguage}
            />
          </div>
        </div>
      </div>
    );
  }
}

function LanguageButton({ language, handleClick, acronym, active }) {
  return (
    <div
      onClick={() => handleClick(language)}
      className={`${active ? styles.Active : ""} ${styles.LanguageButton}`}
    >
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
    selectedLanguage: state.ui.selectedLanguage
  };
}

function mapDispatchToProps(dispatch) {
  return {
    selectLanguage: language => selectLanguage(dispatch, language)
  };
}

const LanguageChooser = connect(mapStateToProps, mapDispatchToProps)(
  LanguageChooserComponent
);

export default LanguageChooser;
