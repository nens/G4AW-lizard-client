import { theStore } from "../store/Store";
import { UPDATE_MAP_LOCATION } from "../constants/ActionTypes";

export function updateMapLocation(dispatch, settings) {
  dispatch({ type: UPDATE_MAP_LOCATION, settings });
}
