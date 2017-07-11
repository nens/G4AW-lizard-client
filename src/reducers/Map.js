import * as ActionTypes from "../constants/ActionTypes";
import { initialMapState } from "../store/Store";

export default function(state = initialMapState, action) {
  switch (action.type) {
    case ActionTypes.UPDATE_MAP_BBOX:
      return { ...state, bbox: action.bbox };
    default:
      return state;
  }
}
