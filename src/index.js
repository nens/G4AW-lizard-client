import { theStore } from './store/configureStore';
import * as actions from './actions';

/*
 * In UMD: ************************************** works in browser: 10-04-17
 *
 * var lizard = window.Lizard.theStore;
 * var actions = window.Lizard.actions;
 *
 * Everywhere:
 *
 * lizard.dispatch(actions.fetchRasterAsync(uuid, lizard.dispatch));
 *
 * [?? to be checked....
 *     lizard.subscribe(function () { console.log(lizard.getState()) });]
 */

const hoogteUuid = "10415ccb-ec31-4d43-bdb3-db597061527b"; // Dirk backend

console.log('[dbg] @src/index.js: theStore =', theStore);

const p = actions.fetchRasterAsync(hoogteUuid, theStore.dispatch);

console.log('[dbg] @src/index.js: p =', p);

p.then(function (data) {
  console.log("P resolved; data =", data);
  const state = theStore.getState();
  console.log('[dbg] @src/index.js: state =', state, 'raster =', state.rasters[hoogteUuid].data.toString());
});

export { actions as actions };
export { theStore as theStore };

// export default configureStore;

