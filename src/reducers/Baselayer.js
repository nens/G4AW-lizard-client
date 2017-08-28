import * as ActionTypes from "../constants/ActionTypes";
import { getInitialBaselayerState } from "../store/Store";

export default function(state = getInitialBaselayerState(), action) {
  switch (action.type) {
    case ActionTypes.CHANGE_BASELAYER:
      const newLayers = [...state.layers].map((layer, i) => {
        layer.active = i === action.index;
        return layer;
      });
      return { ...state, layers: newLayers };
    default:
      return state;
  }
}
