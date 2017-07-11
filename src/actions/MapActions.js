import { theStore } from "../store/Store";
import { UPDATE_MAP_BBOX } from "../constants/ActionTypes";

export function updateMapLocation(dispatch, settings) {
  dispatch({ type: UPDATE_MAP_LOCATION, settings });
}

function isValidBbox(bbox) {
  const arrayCheck = Object.prototype.toString.call(bbox) === "[object Array]";
  return arrayCheck && bbox.length == 4;
}

export function updateMapBbox(dispatch, bbox) {
  if (isValidBbox(bbox)) {
    dispatch({ type: UPDATE_MAP_BBOX, bbox });
  } else {
    console.error("Not a valid bbox:", bbox);
  }
}
