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

// Session constants (fetch /bootstrap/lizard, receive it)
export const FETCH_BOOTSTRAP = "FETCH_BOOTSTRAP";
export const RECEIVE_BOOTSTRAP = "RECEIVE_BOOTSTRAP";

export const FETCH_RASTER = "FETCH_RASTER";
export const RECEIVE_RASTER = "RECEIVE_RASTER";
export const REMOVE_RASTER = "REMOVE_RASTER";

export const SET_SEARCH_INPUT_TEXT = "SET_SEARCH_INPUT_TEXT";
export const START_SEARCH = "START_SEARCH";
export const RECEIVE_SEARCH_RESULTS = "RECEIVE_SEARCH_RESULTS";
export const CLEAR_SEARCH_RESULTS = "CLEAR_SEARCH_RESULTS";

export const FETCH_TIMESERIES = "FETCH_TIMESERIES";
export const RECEIVE_TIMESERIES = "RECEIVE_TIMESERIES";
export const REMOVE_TIMESERIES = "REMOVE_TIMESERIES";

// Actions for the detail page
export const GET_ATTRIBUTES_FROM_GEOSERVER = "GET_ATTRIBUTES_FROM_GEOSERVER";
export const RECEIVE_ATTRIBUTES_FROM_GEOSERVER =
  "RECEIVE_ATTRIBUTES_FROM_GEOSERVER";

// Actions for geolocation
export const START_GEOLOCATION = "START_GEOLOCATION";
export const RECEIVE_GEOLOCATION = "RECEIVE_GEOLOCATION";

export const SHOW_SNACKBAR = "SHOW_SNACKBAR";
export const HIDE_SNACKBAR = "HIDE_SNACKBAR";
