import i18next from "i18next";
import {
  FETCH_BOOTSTRAP,
  RECEIVE_BOOTSTRAP_SUCCESS,
  RECEIVE_BOOTSTRAP_ERROR,
  SET_INTERNET_AVAILABILITY
} from "../constants/ActionTypes";
import { showSnackBar } from "./UiActions";

import { getBootstrap } from "lizard-api-client";
import { theStore } from "../store/Store";

export function setInternetAvailability(dispatch, isOnline) {
  dispatch({ type: SET_INTERNET_AVAILABILITY, isOnline });
}

export function fetchBootstrapAction() {
  return { type: FETCH_BOOTSTRAP };
}

export function receiveBootstrapSuccessAction(bootstrap) {
  return {
    type: RECEIVE_BOOTSTRAP_SUCCESS,
    bootstrap
  };
}

export function receiveBootstrapErrorAction(error) {
  return {
    type: RECEIVE_BOOTSTRAP_ERROR,
    error
  };
}

export function fetchBootstrap(dispatch, sessionState) {
  if (sessionState && (sessionState.isFetching || sessionState.hasBootstrap)) {
    return;
  }

  dispatch(fetchBootstrapAction());

  getBootstrap().then(
    bootstrap => {
      dispatch(receiveBootstrapSuccessAction(bootstrap));
      showSnackBar(dispatch, {
        message: i18next.t("The application initialized succesfully"),
        subMessage: i18next.t(
          "The required data was retrieved from the server"
        ),
        autoHideDuration: 3000
      });
    },
    error => {
      dispatch(receiveBootstrapErrorAction(error));
      console.error(error);
      showSnackBar(dispatch, {
        isError: true,
        message: i18next.t("There was an error initializing the application"),
        subMessage: i18next.t("The application may not work as expected")
      });
    }
  );
}
