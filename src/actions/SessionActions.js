import { FETCH_BOOTSTRAP, RECEIVE_BOOTSTRAP } from "../constants/ActionTypes";
import { getBootstrap } from "lizard-api-client";
import { theStore } from "../store/Store";
import { getBootstrap } from "lizard-api-client";

export function fetchBootstrapAction() {
  return { type: FETCH_BOOTSTRAP };
}

export function receiveBootstrapAction(bootstrap) {
  return {
    type: RECEIVE_BOOTSTRAP,
    bootstrap: bootstrap
  };
}

export function fetchBootstrap(dispatch, sessionState) {
  if (sessionState && (sessionState.isFetching || sessionState.hasBootstrap)) {
    return;
  }

  dispatch(fetchBootstrapAction());

  getBootstrap().then(bootstrap => {
    dispatch(receiveBootstrapAction(bootstrap));
  });
}
