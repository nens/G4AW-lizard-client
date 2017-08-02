import i18next from "i18next";
import { createStore, applyMiddleware, combineReducers } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import reducers from "../reducers/index";

import { DEFAULT_BBOX } from "../constants/defaults";

let createStoreWithMiddleware;
const logger = createLogger({});

createStoreWithMiddleware = applyMiddleware(thunkMiddleware, logger)(
  createStore
);

// The parts of the initial state are exported as their own variables so that Reducers
// can use them as default parameters.
// See G4AW-state-plan.md.

export const initialUiState = {
  currentView: "ListSearchView",
  searchView: "ListSearchView",
  selectedParcel: null,
  currentSettingsTabIdx: 0,
  searchResultsAsList: false,
  showSnackBar: false,
  showLegend: false,
  snackBarOptions: {
    message: null,
    subMessage: null
  }
};

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

export const initialBaselayerState = {
  layers: [
    {
      title: i18next.t("Topography"),
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
      title: i18next.t("Satellite"),
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
      title: i18next.t("Neutral"),
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

export const initialParcelsState = {};

export const initialPhotosForParcelState = {};

export const initialTimeseriesState = {};

export const initialForegroundlayerState = {
  url: "https://maps1.project.lizard.net/geoserver/Q0007_sat4rice_2018/wms",
  layers: [
    {
      title: i18next.t("Rice fields"),
      uuid: "01d932b",
      active: true,
      slug: "latest_weekly_LT",
      mapThumb:
        "https://maps1.project.lizard.net/geoserver/Q0007_sat4rice_2018/wms?service=WMS&request=GetMap&layers=latest_weekly_LT&styles=&format=image%2Fpng&transparent=True&version=1.1.1&height=256&width=256&srs=EPSG%3A3857&bbox=11709388.36300615,1164288.814839805,11709541.23706272,1164441.6888963755",
      colormap: []
    },
    {
      title: i18next.t("Growth stages"),
      uuid: "aaa1b7c",
      active: false,
      slug: "latest_weekly_growth_stages",
      mapThumb:
        "https://maps1.project.lizard.net/geoserver/Q0007_sat4rice_2018/wms?service=WMS&request=GetMap&layers=latest_weekly_growth_stages&styles=&format=image%2Fpng&transparent=True&version=1.1.1&height=256&width=256&srs=EPSG%3A3857&bbox=11709388.36300615,1164288.814839805,11709541.23706272,1164441.6888963755",
      colormap: [
        { Fallow: "#aab3b6" },
        { Baresoil: "#6e7476" },
        { Seeding: "#0093d3" },
        { Tillering: "#459b00" },
        { Booting: "#34c300" },
        { Flowering: "#253a20" },
        { Milking: "#ffc306" },
        { Ripening: "#ff7813" },
        { Harvesting: "#e84506" }
      ]
    },
    {
      title: i18next.t("Pest presence"),
      uuid: "15d1155",
      active: false,
      slug: "latest_weekly_pest_presence",
      mapThumb:
        "https://maps1.project.lizard.net/geoserver/Q0007_sat4rice_2018/wms?service=WMS&request=GetMap&layers=latest_weekly_pest_presence&styles=&format=image%2Fpng&transparent=True&version=1.1.1&height=256&width=256&srs=EPSG%3A3857&bbox=11709388.36300615,1164288.814839805,11709541.23706272,1164441.6888963755",
      colormap: [
        { Blast: "#95786f" },
        { "Leaf folder": "#e5907d" },
        { "Brown planthopper": "#bfc2bb" }
      ]
    }
  ]
};

const initialState = {
  baselayer: initialBaselayerState,
  geolocation: initialGeolocationState,
  map: initialMapState,
  parcels: initialParcelsState,
  search: initialSearchState,
  session: initialSessionState,
  timeseries: initialTimeseriesState,
  baselayer: initialBaselayerState,
  foregroundlayer: initialForegroundlayerState,
  ui: initialUiState
};

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
