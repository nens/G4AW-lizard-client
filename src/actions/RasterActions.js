import { FETCH_RASTER, RECEIVE_RASTER, REMOVE_RASTER }
  from '../constants/ActionTypes';

import { LizardApiClient } from 'lizard-api-client';

const lizardApiClient = new LizardApiClient();

// TODO: substitute with correct imported function from the
// lizard-state-client
let fetchItem = (foo, bar) => Promise.resolve([1, 2, 3]);

export const fetchRaster = (uuid) => {
  return {
    type: FETCH_RASTER,
    uuid
  };
};

const receiveRaster = (uuid, data) => {
  return {
    type: RECEIVE_RASTER,
    uuid,
    data
  };
};

export const removeRaster = (uuid) => {
  return {
    type: REMOVE_RASTER,
    uuid
  };
};

// ORIGINAL REDUX (THUNK MIDDLEWARE IDIOM):
///////////////////////////////////////////
// export const fetchRasterAsync = (uuid) => {
//   return function (dispatch) {
//     dispatch(fetchRaster(uuid));
//     return fetchItem('raster', uuid)
//       .then(data => {
//         dispatch(receiveRaster(uuid, data));
//         return data;
//       }
//     );
//   };
// };

// diy/MINIMALISTIC IMPLMENTATION (reducers still OK???)
////////////////////////////////////////////////////////
export const fetchRasterAsync = (uuid, dispatch) => {
  dispatch(fetchRaster(uuid));
  return lizardApiClient.raster(uuid)
    .then(data => {
      dispatch(receiveRaster(uuid, data));
      return data;
    }
  );
};

