import * as ActionTypes from "../constants/ActionTypes";
import { initialMapState } from "../store/Store";

export default function(state = initialMapState, action) {
  switch (action.type) {
    case ActionTypes.UPDATE_MAP_LOCATION:
      return { ...state, settings: action.settings };
    default:
      return state;
  }
}
