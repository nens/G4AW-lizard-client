import React, { Component } from "react";
import styles from "./styles/DetailView.css";
import { SECTIONS, NO_DATA } from "../constants/detailview-attributes";
import { DetailViewSection, DetailViewTable } from ".";

export default class DetailViewSectionDroughtSalinityDamage extends Component {
  render() {
    const { t, parcel, data } = this.props;
    return (
      <DetailViewSection
        isInitiallyOpen={false}
        title={t("DroughtAndSalinityDamage")}
      >
        <div className={styles.SectionWrapper}>
          <DetailViewTable data={data} />
        </div>
      </DetailViewSection>
    );
  }
}
