import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducers from '../reducers/index';

let createStoreWithMiddleware;

createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);

/**
 * Consumer applications may call createStore({}initialState, {}ownReducers) to
 * create a store with Lizard state and application specific state.
 */
function configureStore(
  initialState = {
    'rasters': {}
  },
  externalReducers = {}) {

  const rootReducer = combineReducers({ ...reducers, ...externalReducers });

  return createStoreWithMiddleware(rootReducer, initialState);
}

export const theStore = configureStore();
console.log('Store: ', theStore.getState());

/*
State = {
  Rasters: {
    <Raster UUID 1>: {
      isFetching: <Boolean>,
      data: <RasterStoreObject 1>,  // "data" and "error" values are mutual
      error: <String[]>            // exclusive: max. one will be set.
    },
    <Raster UUID 2>: {
      isFetching: <Boolean>,
      data: <RasterStoreObject 2>,
      error: <String[]>
    },
  }
}
*/
