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
  searchResultsAsList: false,
  showSnackBar: false,
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

export const initialParcelsState = {};

export const initialPhotosForParcelState = {};

export const initialTimeseriesState = {};

export const initialRastersState = {};

export const initialSettingsState = {};

const initialState = {
  photosForParcel: initialPhotosForParcelState, //TODO
  settings: initialSettingsState, // TODO

  geolocation: initialGeolocationState,
  parcels: initialParcelsState,
  ui: initialUiState,
  session: initialSessionState,
  search: initialSearchState,
  timeseries: initialTimeseriesState,
  rasters: initialRastersState
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
