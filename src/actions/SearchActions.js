import i18next from "i18next";
import flip from "@turf/flip";
import bbox from "@turf/bbox";
import { feature, featureCollection } from "@turf/helpers";
import {
  CLEAR_SEARCH_RESULTS,
  RECEIVE_SEARCH_RESULTS_SUCCESS,
  RECEIVE_SEARCH_RESULTS_ERROR,
  SET_SEARCH_INPUT_TEXT,
  START_SEARCH
} from "../constants/ActionTypes";
import { theStore } from "../store/Store";

import { searchParcels } from "lizard-api-client";
import { getParcelsByName } from "lizard-api-client";
import { showSnackBar } from "./UiActions";
import { updateMapBbox } from "./MapActions";

export const startSearch = () => ({
  type: START_SEARCH
});

export const receiveResultsSuccess = results => ({
  type: RECEIVE_SEARCH_RESULTS_SUCCESS,
  results
});

export const receiveResultsError = error => ({
  type: RECEIVE_SEARCH_RESULTS_ERROR,
  error
});

export const clearResults = () => ({
  type: CLEAR_SEARCH_RESULTS
});

export const setSearchInputText = inputText => ({
  type: SET_SEARCH_INPUT_TEXT,
  inputText
});

function doSearch(dispatch, q, types = null, exclude = []) {
  const state = theStore.getState();
  const currentData = state.search;

  if (currentData && currentData.isFetching) {
    // Do nothing.
    return;
  }

  dispatch(startSearch());

  const searchCompliantBbox = [
    state.map.bbox[3],
    state.map.bbox[0],
    state.map.bbox[1],
    state.map.bbox[2]
  ];

  searchParcels(q, searchCompliantBbox).then(
    results => {
      dispatch(receiveResultsSuccess(results));
      const parcels = results.map(r => feature(r.geometry));
      const boundingBox = bbox(flip(featureCollection(parcels)));
      updateMapBbox(dispatch, boundingBox);
    },
    error => {
      const msg = "Search error: " + error;
      const message = i18next.t("There was an error while searching for");
      dispatch(receiveResultsError(msg));
      showSnackBar(dispatch, {
        isError: true,
        message: `${message} '${q}'`,
        subMessage: i18next.t("Please try again later")
      });
    }
  );
}

export { doSearch };
