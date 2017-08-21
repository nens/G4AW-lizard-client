import i18next from "i18next";

const NO_DATA = "...";

const SECTIONS = {
  FieldInfo: {
    sectionName: i18next.t("Field info"),
    sectionAttrs: [
      {
        attr: "FarmID",
        getTranslatedAttr: () => i18next.t("FarmID")
      },
      {
        attr: "Cooporation",
        getTranslatedAttr: () => i18next.t("Cooporation")
      },
      {
        attr: "FarmerName",
        getTranslatedAttr: () => i18next.t("FarmerName")
      },
      {
        attr: "FieldSize",
        getTranslatedAttr: () => i18next.t("FieldSize"),
        getTranslatedUnit: () => i18next.t("ha")
      },
      {
        attr: "FarmerFriend",
        getTranslatedAttr: () => i18next.t("FarmerFriend")
      },
      {
        attr: "Visit",
        getTranslatedAttr: () => i18next.t("Visit")
      },
      {
        attr: "SpecialSituation",
        getTranslatedAttr: () => i18next.t("SpecialSituation")
      }
    ]
  },

  RiceGrowth: {
    sectionName: i18next.t("Rice growth"),
    sectionAttrs: [
      {
        attr: "ExpectedHarvestDate",
        getTranslatedAttr: () => i18next.t("ExpectedHarvestDate")
      },
      {
        attr: "DaysAfterSowing",
        getTranslatedAttr: () => i18next.t("DaysAfterSowing")
      },
      {
        attr: "SowDate",
        getTranslatedAttr: () => i18next.t("SowDate")
      },
      {
        attr: "GrowthStage",
        getTranslatedAttr: () => i18next.t("GrowthStage")
      },
      {
        attr: "PlantHeight",
        getTranslatedAttr: () => i18next.t("PlantHeight"),
        getTranslatedUnit: () => i18next.t("cm")
      },
      {
        attr: "CropCondition",
        getTranslatedAttr: () => i18next.t("CropCondition")
      },
      {
        attr: "NumberOfStems",
        getTranslatedAttr: () => i18next.t("NumberOfStems"),
        getTranslatedUnit: () => i18next.t("/m2")
      },
      {
        attr: "Variety",
        getTranslatedAttr: () => i18next.t("Variety")
      },
      {
        attr: "LastSeasonYield",
        getTranslatedAttr: () => i18next.t("LastSeasonYield"),
        getTranslatedUnit: () => i18next.t("ton/ha")
      },
      {
        attr: "LastSeasonNumberStems",
        getTranslatedAttr: () => i18next.t("LastSeasonNumberStems"),
        getTranslatedUnit: () => i18next.t("/m2")
      },
      {
        attr: "LastSeasonPricePaddy",
        getTranslatedAttr: () => i18next.t("LastSeasonPricePaddy"),
        getTranslatedUnit: () => i18next.t("VND/ton")
      },
      {
        attr: "LastSeasonVariety",
        getTranslatedAttr: () => i18next.t("LastSeasonVariety")
      },
      {
        attr: "LastSeasonHarvestDate",
        getTranslatedAttr: () => i18next.t("LastSeasonHarvestDate")
      },
      {
        attr: "LastSeasonSowingDate",
        getTranslatedAttr: () => i18next.t("LastSeasonSowingDate")
      }
    ]
  },

  PestRisk: {
    sectionName: i18next.t("Pest risk"),
    sectionAttrs: [
      {
        attr: "PestRisk",
        // attrTranslate: i18next.t("PestRisk"),
        getTranslatedAttr: () => i18next.t("PestRisk")
      },
      {
        attr: "BrownPlantHopperPresent",
        // attrTranslate: i18next.t("BrownPlantHopperPresent"),
        getTranslatedAttr: () => i18next.t("BrownPlantHopperPresent")
      },
      {
        attr: "LeaffolderPresent",
        // attrTranslate: i18next.t("LeaffolderPresent")
        getTranslatedAttr: () => i18next.t("LeaffolderPresent")
      },
      {
        attr: "BlastPresent",
        // attrTranslate: i18next.t("BlastPresent")
        getTranslatedAttr: () => i18next.t("BlastPresent")
      },
      {
        attr: "BrownPlantHopperRisk",
        // attrTranslate: i18next.t("BrownPlantHopperRisk")
        getTranslatedAttr: () => i18next.t("BrownPlantHopperRisk")
      },
      {
        attr: "LeaffolderRisk",
        // attrTranslate: i18next.t("LeaffolderRisk")
        getTranslatedAttr: () => i18next.t("LeaffolderRisk")
      },
      {
        attr: "BlastRisk",
        // attrTranslate: i18next.t("BlastRisk")
        getTranslatedAttr: () => i18next.t("BlastRisk")
      }
    ]
  },

  FloodRisk: {
    sectionName: i18next.t("Flood risk"),
    sectionAttrs: [
      {
        attr: "FloodRisk",
        // attrTranslate: i18next.t("FloodRisk")
        getTranslatedAttr: () => i18next.t("FloodRisk")
      },
      {
        attr: "FloodLevel",
        // attrTranslate: i18next.t("FloodLevel"),
        getTranslatedAttr: () => i18next.t("FloodLevel"),
        // unit: i18next.t("mNAP")
        getTranslatedUnit: () => i18next.t("mMSL")
      }
    ]
  }
};

console.log("EXPORT 'SECTIONS' ... only once?");

export { NO_DATA, SECTIONS };
