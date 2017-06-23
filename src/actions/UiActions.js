import { theStore } from "../store/Store";
import {
  CHANGE_VIEW,
  SHOW_SNACKBAR,
  HIDE_SNACKBAR
} from "../constants/ActionTypes";

let timerAutoHideId;

export function changeView(dispatch, newView) {
  dispatch({ type: CHANGE_VIEW, newView });
}

export function showSnackBar(dispatch, options) {
  if (options.autoHideDuration) {
    clearTimeout(timerAutoHideId);
    timerAutoHideId = setTimeout(() => {
      dispatch(hideSnackBar);
    }, options.autoHideDuration);
  }
  clearTimeout(timerAutoHideId);
  dispatch({ type: SHOW_SNACKBAR, options });
}

export function hideSnackBar(dispatch) {
  dispatch({ type: HIDE_SNACKBAR });
}
