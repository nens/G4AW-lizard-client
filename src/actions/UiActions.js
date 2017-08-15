import { theStore } from "../store/Store";
import {
  CHANGE_VIEW,
  CHANGE_SETTINGS_TAB,
  HIDE_SNACKBAR,
  SHOW_SNACKBAR,
  TOGGLE_LEGEND,
  TOGGLE_SEARCHRESULTS_LIST_CARD_MODE,
  SELECT_LANGUAGE
} from "../constants/ActionTypes";

import i18next from "i18next";

let timerAutoHideId;

export function changeView(dispatch, newView) {
  dispatch({ type: CHANGE_VIEW, newView });
}

export function changeSettingsTab(dispatch, newSettingsTabIdx) {
  dispatch({ type: CHANGE_SETTINGS_TAB, newSettingsTabIdx });
}

export function showSnackBar(dispatch, options) {
  const state = theStore.getState();
  clearTimeout(timerAutoHideId);

  if (state.ui.showSnackBar) {
    dispatch({ type: HIDE_SNACKBAR });
    setTimeout(() => {
      showSnackBar(dispatch, options);
    }, 250);
  } else {
    if (options.autoHideDuration) {
      timerAutoHideId = setTimeout(() => {
        hideSnackBar(dispatch);
      }, options.autoHideDuration);
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

export function selectLanguage(dispatch, language) {
  let languageAcronym;
  switch (language) {
    case "Vietnamese":
      languageAcronym = "vi";
      break;
    case "Dutch":
      languageAcronym = "nl";
      break;
    default:
      languageAcronym = "en";
  }

  i18next.changeLanguage(languageAcronym);
  dispatch({
    type: SELECT_LANGUAGE,
    languageAcronym
  });
}
