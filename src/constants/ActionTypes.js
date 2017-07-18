/*

ActionsTypes.js

In this file the different possible  Reduxactions are centralized.
There are three standard actions we use for a datatype (only "Raster"
(and "Intersection"?) for now (10-04-2017)) and they follow the
conventions/methodology as described below. The naturally ordered steps
in the lifecycle of a key-value pair in the stores' raster section:

1) ADD_RASTER_SYNC

  We initiate a new key-value pair in the stores' raster section. We'll use
  the UUID as key, the value will be an (immutable) object as contained
  in the Promise returned from our Lizard-Api-Client.

  This happens in-sync.

2) [ADD_RASTER] ... not a real Redux action; only used internally in
  RasterActions.js! Since it invokes a-sync code execution, it should never
  be dispatched to the reducers

  The resolving of the Promise as returned from the Lizard-Api-Client.
  The Promise should resolve with an immutable RasterStore object. In case
  an error occurrs

  This happens a-sync.

3) RECEIVE_RASTER

  The handling of a readily resolved Promise: we write the received data
  to the stores' raster section.

  This happens in-sync.

4) REMOVE_RASTER

  The removing of both key and value from the stores' raster section.

  This happens in-sync.

5) START_SEARCH

  Sets the search result to 'fetching', empties list of results.

6) RECEIVE_SEARCH_RESULTS

  Write the received search results to the store.

7) CLEAR_SEARCH_RESULTS

  Clear the search results list (e.g. when user begins typing a new query or clicks 'X').

******************************************************************************/

export const CHANGE_VIEW = "CHANGE_VIEW";
export const CHANGE_SETTINGS_TAB = "CHANGE_SETTINGS_TAB";

// Session constants (fetch /bootstrap/lizard, receive it)
export const FETCH_BOOTSTRAP = "FETCH_BOOTSTRAP";
export const RECEIVE_BOOTSTRAP_SUCCESS = "RECEIVE_BOOTSTRAP_SUCCESS";
export const RECEIVE_BOOTSTRAP_ERROR = "RECEIVE_BOOTSTRAP_ERROR";

export const FETCH_RASTER = "FETCH_RASTER";
export const RECEIVE_RASTER = "RECEIVE_RASTER";
export const REMOVE_RASTER = "REMOVE_RASTER";

export const SET_SEARCH_INPUT_TEXT = "SET_SEARCH_INPUT_TEXT";
export const START_SEARCH = "START_SEARCH";
export const RECEIVE_SEARCH_RESULTS_SUCCESS = "RECEIVE_SEARCH_RESULTS_SUCCESS";
export const RECEIVE_SEARCH_RESULTS_ERROR = "RECEIVE_SEARCH_RESULTS_ERROR";
export const CLEAR_SEARCH_RESULTS = "CLEAR_SEARCH_RESULTS";
// export const ADD_SEARCH_RESULT_MANUALLY = "ADD_SEARCH_RESULT_MANUALLY";

export const FETCH_TIMESERIES = "FETCH_TIMESERIES";
export const RECEIVE_TIMESERIES = "RECEIVE_TIMESERIES";
export const REMOVE_TIMESERIES = "REMOVE_TIMESERIES";

// Actions for the detail page
export const GET_ATTRIBUTES_FROM_GEOSERVER = "GET_ATTRIBUTES_FROM_GEOSERVER";
export const GET_ATTRIBUTES_FROM_GEOSERVER_BY_LAT_LNG =
  "GET_ATTRIBUTES_FROM_GEOSERVER_BY_LAT_LNG";
export const RECEIVE_ATTRIBUTES_FROM_GEOSERVER_SUCCESS =
  "RECEIVE_ATTRIBUTES_FROM_GEOSERVER_SUCCESS";
export const RECEIVE_ATTRIBUTES_FROM_GEOSERVER_ERROR =
  "RECEIVE_ATTRIBUTES_FROM_GEOSERVER_ERROR";
export const DESELECT_PARCEL = "DESELECT_PARCEL";

// Actions for geolocation
export const SET_GEOLOCATION_SUPPORT = "SET_GEOLOCATION_SUPPORT";
export const START_GEOLOCATION = "START_GEOLOCATION";
export const RECEIVE_GEOLOCATION_SUCCESS = "RECEIVE_GEOLOCATION_SUCCESS";
export const RECEIVE_GEOLOCATION_ERROR = "RECEIVE_GEOLOCATION_ERROR";
export const CLEAR_GEOLOCATION = "CLEAR_GEOLOCATION";

// UI Actions
export const SHOW_SNACKBAR = "SHOW_SNACKBAR";
export const HIDE_SNACKBAR = "HIDE_SNACKBAR";
export const TOGGLE_SEARCHRESULTS_LIST_CARD_MODE =
  "TOGGLE_SEARCHRESULTS_LIST_CARD_MODE";
export const TOGGLE_LEGEND = "TOGGLE_LEGEND";

// Map actions
export const UPDATE_MAP_BBOX = "UPDATE_MAP_BBOX";

// Baselayer actions
export const CHANGE_BASELAYER = "CHANGE_BASELAYER";

//Foregroundlayer actions:
export const CHANGE_FOREGROUNDLAYER = "CHANGE_FOREGROUNDLAYER";
