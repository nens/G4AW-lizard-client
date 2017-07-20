import * as ActionTypes from "../constants/ActionTypes";
import { initialUiState } from "../store/Store";

import includes from "lodash/includes";

export default function(state = initialUiState, action) {
  switch (action.type) {
    case ActionTypes.TOGGLE_LEGEND:
      return { ...state, showLegend: !state.showLegend };
    case ActionTypes.TOGGLE_SEARCHRESULTS_LIST_CARD_MODE:
      return { ...state, searchResultsAsList: !state.searchResultsAsList };
    case ActionTypes.SHOW_SNACKBAR:
      return { ...state, showSnackBar: true, snackBarOptions: action.options };
    case ActionTypes.HIDE_SNACKBAR:
      return {
        ...state,
        showSnackBar: false,
        snackBarOptions: {
          message: null,
          subMessage: null
        }
      };
    case ActionTypes.GET_ATTRIBUTES_FROM_GEOSERVER:
      return { ...state, selectedParcel: action.parcelId };
    case ActionTypes.CHANGE_VIEW:
      const newSearchView = includes(
        ["ListSearchView", "MapSearchView"],
        action.newView
      )
        ? action.newView
        : state.searchView;
      return {
        ...state,
        currentView: action.newView,
        searchView: newSearchView
      };
    case ActionTypes.CHANGE_SETTINGS_TAB:
      return { ...state, currentSettingsTabIdx: action.newSettingsTabIdx };
    case ActionTypes.DESELECT_PARCEL:
      return { ...state, selectedParcel: null };
    case ActionTypes.CLEAR_SEARCH_RESULTS:
      return { ...state, selectedParcel: null };
    default:
      return state;
  }
}
