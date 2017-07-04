import { createStore, applyMiddleware, combineReducers } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import reducers from "../reducers/index";

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
  currentSettingsTab: "Settings",
  searchResultsAsList: false,
  showSnackBar: false,
  showLegend: false,
  snackBarOptions: {
    message: null,
    subMessage: null
  }
};

export const initialMapState = {
  settings: {
    bbox: null,
    lat: null,
    lng: null,
    zoom: null
  }
};

export const initialSessionState = {
  // Authentication and user information
  isFetching: false, // Sent a request to bootstrap
  hasBootstrap: false, // Whether result is in
  bootstrap: null // Resulting bootstrap object from Lizard API /bootstrap/lizard
};

export const initialSearchState = {
  latestSearchTerm: null,
  results: null,
  inputText: null
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
      title: "Topography",
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
      title: "Satellite",
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
      title: "Neutral",
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

export const initialRastersState = {};

export const initialForegroundlayerState = {
  url: "https://maps1.project.lizard.net/geoserver/Q0007_sat4rice_2018/wms",
  layers: [
    {
      title: "Rice fields",
      uuid: "01d932b",
      active: true,
      slug: "latest_weekly_LT",
      mapThumb:
        "https://maps1.project.lizard.net/geoserver/Q0007_sat4rice_2018/wms?service=WMS&request=GetMap&layers=latest_weekly_LT&styles=&format=image%2Fpng&transparent=True&version=1.1.1&height=256&width=256&srs=EPSG%3A3857&bbox=11709388.36300615,1164288.814839805,11709541.23706272,1164441.6888963755",
      colormap: []
    },
    {
      title: "Growth stages",
      uuid: "aaa1b7c",
      active: false,
      slug: "latest_weekly_growth_stages",
      mapThumb:
        "https://maps1.project.lizard.net/geoserver/Q0007_sat4rice_2018/wms?service=WMS&request=GetMap&layers=latest_weekly_growth_stages&styles=&format=image%2Fpng&transparent=True&version=1.1.1&height=256&width=256&srs=EPSG%3A3857&bbox=11709388.36300615,1164288.814839805,11709541.23706272,1164441.6888963755",
      colormap: [
        { Fallow: [170, 179, 182, 255] },
        { "Bare field": [110, 116, 118, 255] },
        { Seedling: [0, 147, 211, 255] },
        { Tillering: [69, 155, 0, 255] },
        { Booting: [52, 195, 0, 255] },
        { Flowering: [37, 58, 32, 255] },
        { Milking: [255, 175, 6, 255] },
        { Ripening: [255, 120, 19, 255] },
        { Harvest: [232, 69, 6, 255] }
      ]
    },
    {
      title: "Pest presence",
      uuid: "15d1155",
      active: false,
      slug: "latest_weekly_pest_presence",
      mapThumb:
        "https://maps1.project.lizard.net/geoserver/Q0007_sat4rice_2018/wms?service=WMS&request=GetMap&layers=latest_weekly_pest_presence&styles=&format=image%2Fpng&transparent=True&version=1.1.1&height=256&width=256&srs=EPSG%3A3857&bbox=11709388.36300615,1164288.814839805,11709541.23706272,1164441.6888963755",
      colormap: [
        { "0%": [110, 240, 132, 100] },
        { "10%": [228, 106, 108, 125] },
        { "20%": [55, 126, 184, 125] },
        { "30%": [77, 175, 74, 125] },
        { "40%": [152, 78, 163, 125] },
        { "50%": [255, 127, 0, 125] },
        { "60%": [255, 255, 51, 125] },
        { "70%": [166, 86, 40, 125] }
      ]
    }
  ]
};

export const initialSettingsState = {};

const initialState = {
  //photosForParcel: initialPhotosForParcelState, //TODO
  //settings: initialSettingsState, // TODO

  baselayer: initialBaselayerState,
  geolocation: initialGeolocationState,
  map: initialMapState,
  parcels: initialParcelsState,
  rasters: initialRastersState,
  search: initialSearchState,
  session: initialSessionState,
  timeseries: initialTimeseriesState,
  rasters: initialRastersState,
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
