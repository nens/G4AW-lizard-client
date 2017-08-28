import React, { Component } from "react";
import styles from "./styles/DetailView.css";
import { NO_DATA } from "../constants/detailview-attributes";
import { DetailViewSection, DetailViewTable } from ".";

import i18next from "i18next";

function getTranslatedGrowthStage(enName_) {
  let enName = enName_.toUpperCase();
  if (i18next.language === "en") {
    return enName;
  } else {
    switch (enName) {
      case "FALLOW":
        return "Bỏ hoang";
      case "BARE FIELD":
        return "blala";
      case "SEEDING":
        return "hohoho";
      case "TILLERING":
        return "lasasals";
      case "BOOTING":
        return "boohooo";
      case "FLOWERING":
        return "flofloflo";
      case "MILKING":
        return "mihihihimilk";
      case "RIPENING":
        return "ririrpre";
      case "HARVESTING":
        return "harharjar";
    }
  }
}

export default class DetailViewSectionGrowthStage extends Component {
  getHumanReadableRiceGrowth(parcel, t) {
    const stage = parcel.GrowthStage
      ? parcel.GrowthStage.toUpperCase()
      : t("unknown");
    const height = parcel.PlantHeight;
    return `${t("The current growth stage is")} ${stage}
      ${t("and the plant height is")}
      ${height || height === 0 ? height : t("an unknown amount of")} cm`;
  }
  render() {
    const {
      t,
      parcel,
      data,
      isInitiallyOpen,
      riceGrowthLayer,
      ColoredSquare
    } = this.props;

    console.log("[dbg] parcel.GrowthStage =", parcel.GrowthStage);
    return (
      <DetailViewSection
        isInitiallyOpen={isInitiallyOpen}
        title={t("Rice Growth")}
      >
        <div className={styles.SectionWrapper}>
          <div className={styles.ColoredSquaresHeader}>
            {parcel.GrowthStage ? parcel.GrowthStage.toUpperCase() : NO_DATA}
          </div>
          <div className={styles.SubMessage}>
            {this.getHumanReadableRiceGrowth(parcel, t)}
          </div>

          {/*
          <div className={styles.ColoredSquaresContainer}>
            {riceGrowthLayer.getColorMap().map((kv, i) => {
              const label = Object.keys(kv)[0];
              const color = Object.values(kv)[0];
              console.log("[dbg] label =", label);
              return (
                <ColoredSquare
                  key={i}
                  key_={i}
                  title={`${t("Growth stage")}: ${label}`}
                  backgroundColor={color}
                  active={label === parcel.GrowthStage}
                />
              );
            })}
          </div>
          */}

          <DetailViewTable data={data} />
        </div>
      </DetailViewSection>
    );
  }
}
