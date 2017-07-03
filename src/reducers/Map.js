import * as ActionTypes from "../constants/ActionTypes";
import { initialMapState } from "../store/Store";

export default function(state = initialMapState, action) {
  switch (action.type) {
    case ActionTypes.UPDATE_MAP_LOCATION_BBOX:
      const settings = { ...state.settings, bbox: action.bbox };
      return { ...state, settings: settings };
    case ActionTypes.UPDATE_MAP_LOCATION:
      return { ...state, settings: action.settings };
    default:
      return state;
  }
}
