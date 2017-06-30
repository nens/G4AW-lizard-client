import { theStore } from "../store/Store";
import {
  CHANGE_VIEW,
  CHANGE_SETTINGS_TAB,
  HIDE_SNACKBAR,
  SHOW_SNACKBAR,
  TOGGLE_LEGEND,
  TOGGLE_SEARCHRESULTS_LIST_CARD_MODE
} from "../constants/ActionTypes";

let timerAutoHideId;

export function changeView(dispatch, newView) {
  dispatch({ type: CHANGE_VIEW, newView });
}

export function changeSettingsTab(dispatch, newSettingsTab) {
  dispatch({ type: CHANGE_SETTINGS_TAB, newSettingsTab });
}

export function showSnackBar(dispatch, options) {
  const state = theStore.getState();

  if (state.ui.showSnackBar === true && options.autoHideDuration) {
    dispatch({ type: HIDE_SNACKBAR });
    setTimeout(() => {
      dispatch({ type: SHOW_SNACKBAR, options });
    }, 250);
  } else {
    if (options.autoHideDuration) {
      clearTimeout(timerAutoHideId);
      timerAutoHideId = setTimeout(() => {
        dispatch(hideSnackBar);
      }, options.autoHideDuration);
    } else {
      clearTimeout(timerAutoHideId);
    }
    dispatch({ type: SHOW_SNACKBAR, options });
  }
}

export function hideSnackBar(dispatch) {
  dispatch({ type: HIDE_SNACKBAR });
}

export function toggleSearchResultsListOrCardMode(dispatch) {
  dispatch({ type: TOGGLE_SEARCHRESULTS_LIST_CARD_MODE });
}

export function toggleLegend(dispatch) {
  dispatch({ type: TOGGLE_LEGEND });
}
