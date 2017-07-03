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
  currentSettingsTab: "Settings",
  searchResultsAsList: false,
  showSnackBar: false,
  showLegend: false,
  snackBarOptions: {
    message: null,
    subMessage: null
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
        "https://maps1.project.lizard.net/geoserver/Q0007_sat4rice_2018/wms?service=WMS&request=GetMap&layers=latest_weekly_LT&styles=&format=image%2Fpng&transparent=True&version=1.1.1&height=256&width=256&srs=EPSG%3A3857&bbox=11707095.252157595,1165511.8072923678,11707706.748383878,1166123.3035186497"
    },
    {
      title: "Growth stages",
      uuid: "aaa1b7c",
      active: false,
      slug: "latest_weekly_growth_stages",
      mapThumb:
        "https://maps1.project.lizard.net/geoserver/Q0007_sat4rice_2018/wms?service=WMS&request=GetMap&layers=latest_weekly_growth_stages&styles=&format=image%2Fpng&transparent=True&version=1.1.1&height=256&width=256&srs=EPSG%3A3857&bbox=11707095.252157595,1165511.8072923678,11707706.748383878,1166123.3035186497"
    },
    {
      title: "Pest presence",
      uuid: "15d1155",
      active: false,
      slug: "latest_weekly_pest_presence",
      mapThumb:
        "https://maps1.project.lizard.net/geoserver/Q0007_sat4rice_2018/wms?service=WMS&request=GetMap&layers=latest_weekly_pest_presence&styles=&format=image%2Fpng&transparent=True&version=1.1.1&height=256&width=256&srs=EPSG%3A3857&bbox=11707095.252157595,1165511.8072923678,11707706.748383878,1166123.3035186497"
    }
  ]
};

export const initialSettingsState = {};

const initialState = {
  //photosForParcel: initialPhotosForParcelState, //TODO
  //settings: initialSettingsState, // TODO

  geolocation: initialGeolocationState,
  parcels: initialParcelsState,
  ui: initialUiState,
  session: initialSessionState,
  search: initialSearchState,
  timeseries: initialTimeseriesState,
  rasters: initialRastersState,
  baselayer: initialBaselayerState,
  foregroundlayer: initialForegroundlayerState
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
