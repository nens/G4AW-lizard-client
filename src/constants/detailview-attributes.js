import i18next from "i18next";

const NO_DATA = "...";

const SECTIONS = {
  FieldInfo: {
    sectionName: i18next.t("Field info"),
    sectionAttrs: [
      {
        attr: "FarmID",
        attrTranslate: i18next.t("FarmID")
      },
      {
        attr: "Cooporation",
        attrTranslate: i18next.t("Cooperation")
      },
      {
        attr: "FarmerName",
        attrTranslate: i18next.t("FarmerName")
      },
      {
        attr: "FieldSize",
        attrTranslate: i18next.t("FieldSize"),
        unit: i18next.t("ha")
      },
      {
        attr: "FarmerFriend",
        attrTranslate: i18next.t("FarmerFriend")
      },
      {
        attr: "Visit",
        attrTranslate: i18next.t("Visit")
      },
      {
        attr: "SpecialSituation",
        attrTranslate: i18next.t("SpecialSituation")
      }
    ]
  },

  RiceGrowth: {
    sectionName: i18next.t("Rice growth"),
    sectionAttrs: [
      {
        attr: "ExpectedHarvestDate",
        attrTranslate: i18next.t("ExpectedHarvestDate")
      },
      { attr: "DaysAfterSowing", attrTranslate: i18next.t("DaysAfterSowing") },
      { attr: "SowDate", attrTranslate: i18next.t("SowDate") },
      { attr: "GrowthStage", attrTranslate: i18next.t("GrowthStage") },
      {
        attr: "PlantHeight",
        attrTranslate: i18next.t("PlantHeight"),
        unit: i18next.t("cm")
      },
      { attr: "CropCondition", attrTranslate: i18next.t("CropCondition") },
      {
        attr: "NumberOfStems",
        attrTranslate: i18next.t("NumberOfStems"),
        unit: i18next.t("/m2")
      },
      { attr: "Variety", attrTranslate: i18next.t("Variety") },
      {
        attr: "LastSeasonYield",
        attrTranslate: i18next.t("LastSeasonYield"),
        unit: i18next.t("ton/ha")
      },
      {
        attr: "LastSeasonNumberStems",
        attrTranslate: i18next.t("LastSeasonNumberStems"),
        unit: i18next.t("/m2")
      },
      {
        attr: "LastSeasonPricePaddy",
        attrTranslate: i18next.t("LastSeasonPricePaddy"),
        unit: i18next.t("VND/ton")
      },
      {
        attr: "LastSeasonVariety",
        attrTranslate: i18next.t("LastSeasonVariety")
      },
      {
        attr: "LastSeasonHarvestDate",
        attrTranslate: i18next.t("LastSeasonHarvestDate")
      },
      {
        attr: "LastSeasonSowingDate",
        attrTranslate: i18next.t("LastSeasonSowingDate")
      },
      { attr: "OverviewPhoto", attrTranslate: i18next.t("OverviewPhoto") }
    ]
  },

  PestRisk: {
    sectionName: i18next.t("Pest risk"),
    sectionAttrs: [
      { attr: "PestRisk", attrTranslate: i18next.t("PestRisk") },
      {
        attr: "BrownPlantHopperPresent",
        attrTranslate: i18next.t("BrownPlantHopperPresent")
      },
      {
        attr: "LeaffolderPresent",
        attrTranslate: i18next.t("LeaffolderPresent")
      },
      { attr: "BlastRisk", attrTranslate: i18next.t("BlastRisk") },
      {
        attr: "BrownPlantHopperRisk",
        attrTranslate: i18next.t("BrownPlantHopperRisk")
      },
      { attr: "LeaffolderRisk", attrTranslate: i18next.t("LeaffolderRisk") },
      { attr: "BlastRisk", attrTranslate: i18next.t("BlastRisk") }
    ]
  },

  FloodRisk: {
    sectionName: i18next.t("Flood risk"),
    sectionAttrs: [
      { attr: "FloodRisk", attrTranslate: i18next.t("FloodRisk") },
      {
        attr: "FloodLevel",
        attrTranslate: i18next.t("FloodLevel"),
        unit: i18next.t("mNAP")
      }
    ]
  }
};

export { NO_DATA, SECTIONS };
