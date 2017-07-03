import * as ActionTypes from "../constants/ActionTypes";
import { initialForegroundlayerState } from "../store/Store";

export default function(state = initialForegroundlayerState, action) {
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
