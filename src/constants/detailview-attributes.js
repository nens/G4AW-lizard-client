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
        attr: "Cooperation",
        getTranslatedAttr: () => i18next.t("Cooperation")
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
        attr: "Variety",
        getTranslatedAttr: () => i18next.t("Variety")
      },
      {
        attr: "LastSeasonYield",
        getTranslatedAttr: () => i18next.t("LastSeasonYield"),
        getTranslatedUnit: () => i18next.t("ton/ha")
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
        attr: "BrownPlantHopperPresent",
        getTranslatedAttr: () => i18next.t("BrownPlantHopperPresent")
      },
      {
        attr: "BrownPlantHopperDensity",
        getTranslatedAttr: () => i18next.t("BrownPlantHopperDensity")
      },
      {
        attr: "BrownPlantHopperAge",
        getTranslatedAttr: () => i18next.t("BrownPlantHopperAge")
      },
      {
        attr: "BrownPlantHopperNearby",
        getTranslatedAttr: () => i18next.t("BrownPlantHopperNearby")
      },
      {
        attr: "LeaffolderPresent",
        getTranslatedAttr: () => i18next.t("LeaffolderPresent")
      },
      {
        attr: "LeaffolderDensity",
        getTranslatedAttr: () => i18next.t("LeaffolderDensity")
      },
      {
        attr: "LeaffolderAge",
        getTranslatedAttr: () => i18next.t("LeaffolderAge")
      },
      {
        attr: "LeaffolderNearby",
        getTranslatedAttr: () => i18next.t("LeaffolderNearby")
      },
      {
        attr: "BlastPresent",
        getTranslatedAttr: () => i18next.t("BlastPresent")
      },
      {
        attr: "BlastDensity",
        getTranslatedAttr: () => i18next.t("BlastDensity")
      },
      {
        attr: "BlastNearby",
        getTranslatedAttr: () => i18next.t("BlastNearby")
      },
      {
        attr: "NaturalEnemies",
        getTranslatedAttr: () => i18next.t("NaturalEnemies")
      },
      {
        attr: "PesticideUsed",
        getTranslatedAttr: () => i18next.t("PesticideUsed")
      },
      {
        attr: "PesticideType",
        getTranslatedAttr: () => i18next.t("PesticideType")
      },
      {
        attr: "BrownPlantHopperRisk",
        getTranslatedAttr: () => i18next.t("BrownPlantHopperRisk")
      },
      {
        attr: "LeaffolderRisk",
        getTranslatedAttr: () => i18next.t("LeaffolderRisk")
      },
      {
        attr: "BlastRisk",
        getTranslatedAttr: () => i18next.t("BlastRisk")
      }
    ]
  },
  DroughtSalinityDamage: {
    sectionName: i18next.t("DroughtAndSalinityDamage"),
    sectionAttrs: [
      {
        attr: "DroughtDamage",
        getTranslatedAttr: () => i18next.t("DroughtDamage")
      },
      {
        attr: "SalinityDamage",
        getTranslatedAttr: () => i18next.t("SalinityDamage")
      }
    ]
  },
  FloodRisk: {
    sectionName: i18next.t("Flood risk"),
    sectionAttrs: [
      {
        attr: "FloodRisk",
        getTranslatedAttr: () => i18next.t("FloodRisk")
      },
      {
        attr: "FloodLevel",
        getTranslatedAttr: () => i18next.t("FloodLevel"),
        // unit: i18next.t("mNAP") // NB! mNAP vs mMSL... is it set correct at geoserver??
        getTranslatedUnit: () => i18next.t("mMSL")
      },
      {
        attr: "FieldFlooded",
        getTranslatedAttr: () => i18next.t("FieldFlooded")
      },
      {
        attr: "RicePlanted",
        getTranslatedAttr: () => i18next.t("RicePlanted")
      }
    ]
  }
};

export { NO_DATA, SECTIONS };
