import {
  FETCH_BOOTSTRAP,
  RECEIVE_BOOTSTRAP_SUCCESS,
  RECEIVE_BOOTSTRAP_ERROR
} from "../constants/ActionTypes";
import { showSnackBar } from "./UiActions";
import { getBootstrap } from "lizard-api-client";
import { theStore } from "../store/Store";

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
        message: "The application initialized succesfully",
        subMessage: "The required data was retrieved from the server",
        autoHideDuration: 3000
      });
    },
    error => {
      dispatch(receiveBootstrapErrorAction(error));
      console.error(error);
      showSnackBar(dispatch, {
        isError: true,
        message: "There was an error initializing the application",
        subMessage: "The application may not work as expected"
      });
    }
  );
}
