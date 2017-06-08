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
  currentPage: null // Todo
};

export const initialSearchState = {
  latestSearchTerm: null,
  results: null
};

export const initialGeoLocationState = {
  isGeoLocationAvailable: null,
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
  ui: initialUiState, // TODO
  geoLocation: initialGeoLocationState, // TODO
  parcels: initialParcelsState, // TODO
  photosForParcel: initialPhotosForParcelState, //TODO

  search: initialSearchState,
  timeseries: initialTimeseriesState,
  rasters: initialRastersState,
  settings: initialSettingsState
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
