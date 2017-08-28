import * as ActionTypes from "../constants/ActionTypes";
import { getInitialForegroundlayerState } from "../store/Store";

export default function(state = getInitialForegroundlayerState(), action) {
  switch (action.type) {
    case ActionTypes.CHANGE_FOREGROUNDLAYER:
      const newLayers = [...state.layers].map((layer, i) => {
        layer.active = i === action.index;
        return layer;
      });
      return { ...state, layers: newLayers };
    default:
      return state;
  }
}
