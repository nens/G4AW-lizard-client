import i18next from "i18next";
import { translate } from "react-i18next";

import { createStore, applyMiddleware, combineReducers } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import reducers from "../reducers/index";

import { DEFAULT_BBOX } from "../constants/defaults";

let createStoreWithMiddleware;
const logger = createLogger({});

// Required helper to change translations at runtime...
function zipListsToDictList(keys, values) {
  const result = [];
  if (keys.length !== values.length) {
    console.error(
      "Error while zipping two lists! unequal size (zip aborted..)"
    );
    return;
  }
  let d;
  for (var i = 0; i < keys.length; i++) {
    d = {};
    d[keys[i]] = values[i];
    result.push(d);
  }
  return result;
}

createStoreWithMiddleware = applyMiddleware(thunkMiddleware, logger)(
  createStore
);

// The parts of the initial state are exported as their own variables so that Reducers
// can use them as default parameters.
// See G4AW-state-plan.md.

const initialUiState = {
  selectedLanguage: i18next.language,
  currentView: "ListSearchView",
  searchView: "ListSearchView",
  selectedParcel: null,
  currentSettingsTabIdx: 0,
  searchResultsAsList: true,
  showSnackBar: false,
  showLegend: false,
  snackBarOptions: {
    message: null,
    subMessage: null
  }
};

export function getInitialUiState() {
  return initialUiState;
}

export const initialMapState = {
  bbox: DEFAULT_BBOX
};

export const initialSessionState = {
  // Authentication and user information
  isFetching: false, // Sent a request to bootstrap
  hasBootstrap: false, // Whether result is in
  bootstrap: null, // Resulting bootstrap object from Lizard API /bootstrap/lizard
  isOnline: null
};

export const initialSearchState = {
  latestSearchTerm: null,
  isFetching: false,
  results: null,
  inputText: null,
  results: null
};

export const initialGeolocationState = {
  isGeolocationSupported: null,
  isFetching: false,
  data: null,
  error: null
};

const initialBaselayerState = {
  layers: [
    {
      getTitle: () => i18next.t("Topography"),
      attribution: "",
      url:
        "https://{s}.tiles.mapbox.com/v3/nelenschuurmans.iaa98k8k/{z}/{x}/{y}.png",
      mapThumb:
        "https://a.tiles.mapbox.com/v3/nelenschuurmans.iaa98k8k/11/1632/963.png",
      opacity: 1,
      layerType: "tms",
      layerOptions: {},
      active: true
    },
    {
      getTitle: () => i18next.t("Satellite"),
      attribution: "",
      url:
        "https://{s}.tiles.mapbox.com/v3/nelenschuurmans.iaa79205/{z}/{x}/{y}.png",
      mapThumb:
        "https://a.tiles.mapbox.com/v3/nelenschuurmans.iaa79205/11/1632/963.png",
      opacity: 1,
      layerType: "tms",
      layerOptions: {},
      active: false
    },
    {
      getTitle: () => i18next.t("Neutral"),
      attribution: "",
      url:
        "https://{s}.tiles.mapbox.com/v3/nelenschuurmans.l15e647c/{z}/{x}/{y}.png",
      mapThumb:
        "https://a.tiles.mapbox.com/v3/nelenschuurmans.l15e647c/11/1632/963.png",
      opacity: 1,
      layerType: "tms",
      layerOptions: {},
      active: false
    }
  ]
};

export function getInitialBaselayerState() {
  return initialBaselayerState;
}

export const initialParcelsState = {};

export const initialPhotosForParcelState = {};

export const initialTimeseriesState = {};

const initialForegroundlayerState = {
  url: "https://maps1.project.lizard.net/geoserver/Q0007_sat4rice_2018/wms",
  layers: [
    {
      getTitle: () => i18next.t("Rice fields"),
      uuid: "01d932be",
      active: true,
      slug: "latest_weekly_LT",
      mapThumb:
        "https://maps1.project.lizard.net/geoserver/Q0007_sat4rice_2018/wms?service=WMS&request=GetMap&layers=latest_weekly_LT&styles=&format=image%2Fpng&transparent=True&version=1.1.1&height=256&width=256&srs=EPSG%3A3857&bbox=11709388.36300615,1164288.814839805,11709541.23706272,1164441.6888963755",
      getColorMap: () =>
        zipListsToDictList(
          [
            i18next.t("LocTroi"),
            i18next.t("Other"),
            i18next.t("LocTroiOutdated")
          ],
          ["#000000", "#B6AEA8", "#FFFFFF"]
        )
    },
    {
      getTitle: () => i18next.t("Growth stages"),
      uuid: "aaa1b7c3",
      active: false,
      slug: "latest_weekly_growth_stages",
      mapThumb:
        "https://maps1.project.lizard.net/geoserver/Q0007_sat4rice_2018/wms?service=WMS&request=GetMap&layers=latest_weekly_growth_stages&styles=&format=image%2Fpng&transparent=True&version=1.1.1&height=256&width=256&srs=EPSG%3A3857&bbox=11709388.36300615,1164288.814839805,11709541.23706272,1164441.6888963755",
      getColorMap: () =>
        zipListsToDictList(
          [
            i18next.t("Fallow"),
            i18next.t("Bare field"),
            i18next.t("Seeding"),
            i18next.t("Tillering"),
            i18next.t("Booting"),
            i18next.t("Flowering"),
            i18next.t("Milking"),
            i18next.t("Ripening"),
            i18next.t("Harvesting")
          ],
          [
            "#aab3b6",
            "#6e7476",
            "#0093d3",
            "#459b00",
            "#34c300",
            "#253a20",
            "#ffc306",
            "#ff7813",
            "#e84506"
          ]
        )
    },
    {
      getTitle: () => i18next.t("Pest presence"),
      uuid: "15d1155b",
      active: false,
      slug: "latest_weekly_pest_presence",
      mapThumb:
        "https://maps1.project.lizard.net/geoserver/Q0007_sat4rice_2018/wms?service=WMS&request=GetMap&layers=latest_weekly_pest_presence&styles=&format=image%2Fpng&transparent=True&version=1.1.1&height=256&width=256&srs=EPSG%3A3857&bbox=11709388.36300615,1164288.814839805,11709541.23706272,1164441.6888963755",
      getColorMap: () =>
        zipListsToDictList(
          [
            i18next.t("Blast"),
            i18next.t("leaf folder"),
            i18next.t("Brown planthopper")
          ],
          ["#eb2fcc", "#d52300", "#532700"]
        )
    },
    {
      getTitle: () => i18next.t("Flood Risk"),
      uuid: "809668f3",
      active: false,
      slug: "latest_weekly_flooded",
      mapThumb:
        "https://maps1.project.lizard.net/geoserver/Q0007_sat4rice_2018/wms?service=WMS&request=GetMap&layers=latest_weekly_flooded&styles=&format=image%2Fpng&transparent=True&version=1.1.1&height=256&width=256&srs=EPSG%3A3857&bbox=11709388.36300615,1164288.814839805,11709541.23706272,1164441.6888963755",
      getColorMap: () => zipListsToDictList([i18next.t("Flooded")], ["#40a4df"])
    }
  ]
};

export function getInitialForegroundlayerState() {
  return initialForegroundlayerState;
}

const initialState = {
  baselayer: initialBaselayerState,
  geolocation: initialGeolocationState,
  map: initialMapState,
  parcels: initialParcelsState,
  search: initialSearchState,
  session: initialSessionState,
  timeseries: initialTimeseriesState,

  baselayer: getInitialBaselayerState(),
  foregroundlayer: getInitialForegroundlayerState(),
  ui: getInitialUiState()
};

// export function getInitialState () {
//   return initialState;
// }

/**
 * Consumer applications may call createStore({}initialState, {}ownReducers) to
 * create a store with Lizard state and application specific state.
 */
function configureStore(initialState = {}, externalReducers = {}) {
  const rootReducer = combineReducers({ ...reducers, ...externalReducers });

  return createStoreWithMiddleware(
    rootReducer,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
}

export const theStore = configureStore(initialState);
