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
