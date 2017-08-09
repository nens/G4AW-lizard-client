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

export function startSearch(dispatch) {
  dispatch({ type: START_SEARCH });
}

export function receiveResultsSuccess(dispatch, results) {
  dispatch({
    type: RECEIVE_SEARCH_RESULTS_SUCCESS,
    results
  });
}

export function receiveResultsError(dispatch, error) {
  dispatch({
    type: RECEIVE_SEARCH_RESULTS_ERROR,
    error
  });
}

export function clearResults(dispatch) {
  dispatch({ type: CLEAR_SEARCH_RESULTS });
}

export function setSearchInputText(dispatch, inputText) {
  dispatch({
    type: SET_SEARCH_INPUT_TEXT,
    inputText
  });
}

function doSearch(dispatch, q, spatializeSearch) {
  const state = theStore.getState();
  const currentData = state.search;

  if (currentData && currentData.isFetching) {
    // Do nothing.
    return;
  }

  const searchCompliantBbox = spatializeSearch
    ? [
        state.map.bbox[3],
        state.map.bbox[0],
        state.map.bbox[1],
        state.map.bbox[2]
      ]
    : null;

  startSearch(dispatch);
  searchParcels(q, searchCompliantBbox).then(
    results => {
      receiveResultsSuccess(dispatch, results);
      if (results.length > 0) {
        // Only update bbox if there were actual results returned:
        const parcels = results.map(r => feature(r.geometry));
        const boundingBox = bbox(flip(featureCollection(parcels)));
        updateMapBbox(dispatch, boundingBox);
      } else {
        showSnackBar(dispatch, {
          autoHideDuration: 4000,
          isError: true,
          message: `${i18next.t("No search results found for")} '${q}'
            ${spatializeSearch ? i18next.t("in your current area") : ""}`
          // subMessage: i18next.t(
          //   "Please try searching elsewhere/using a different query"
          // )
        });
      }
    },
    error => {
      const msg = "Search error: " + error;
      const message = i18next.t("There was an error while searching for");
      receiveResultsError(dispatch, msg);
      showSnackBar(dispatch, {
        isError: true,
        message: `${message} '${q}'`
        // subMessage: i18next.t("Please try again later")
      });
    }
  );
}

export { doSearch };
