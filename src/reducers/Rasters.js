import * as ActionTypes from '../constants/ActionTypes';

import omit from 'lodash/omit';

let defaultState = {};

export default function (state = defaultState, action) {

  let newState = { ...state };
  let newRaster;

  switch (action.type) {
    case ActionTypes.FETCH_RASTER:
      if (action.uuid in newState) {
        newRaster = { ...newState[action.uuid] };
      } else {
        newRaster = {
          isFetching: false,
          data: null,
          error: null
        };
      }
      newRaster.isFetching = true;
      newState[action.uuid] = newRaster;
      return newState;
    case ActionTypes.RECEIVE_RASTER:
      newRaster = { ...newState[action.uuid] };
      newRaster.isFetching = false;
      if (action.data === null) {
        newRaster.data = null;
        newRaster.error = 'Error while fetching raster!';
      } else {
        newRaster.data = action.data;
        newRaster.error = null;
      }
      newState[action.uuid] = newRaster;
      return newState;
    case ActionTypes.REMOVE_RASTER:
      return omit(newState, action.uuid);
    default:
      return state;
  }
}
