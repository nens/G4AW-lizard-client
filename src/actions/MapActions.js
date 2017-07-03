import { theStore } from "../store/Store";
import {
  UPDATE_MAP_LOCATION,
  UPDATE_MAP_LOCATION_BBOX
} from "../constants/ActionTypes";

export function updateMapLocation(dispatch, settings) {
  dispatch({ type: UPDATE_MAP_LOCATION, settings });
}

export function updateMapLocationBbox(dispatch, bbox) {
  dispatch({ type: UPDATE_MAP_LOCATION_BBOX, bbox });
}
