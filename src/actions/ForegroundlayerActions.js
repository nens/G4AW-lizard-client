import { CHANGE_FOREGROUNDLAYER } from "../constants/ActionTypes";
import { theStore } from "../store/Store";

const FOREGROUNDLAYER_COUNT = theStore.getState().foregroundlayer.layers.length;

export function changeForegroundlayer(dispatch, index) {
  dispatch({ type: CHANGE_FOREGROUNDLAYER, index });
}

export function getActiveForegroundlayer() {
  const allForegroundlayers = theStore.getState().foregroundlayer.layers;
  for (let i = 0; i < allForegroundlayers.length; i++) {
    if (allForegroundlayers[i].active) {
      return allForegroundlayers[i];
    }
  }
  console.error(
    `Could not find active foregroundlayer! All foregroundlayers:
    ${allForegroundlayers}`
  );
}

export function getActiveForegroundlayerIdx() {
  const allForegroundlayers = theStore.getState().foregroundlayer.layers;
  for (let i = 0; i < allForegroundlayers.length; i++) {
    if (allForegroundlayers[i].active) {
      return i;
    }
  }
  console.error(
    `Could not find active foregroundlayer idx! All foregroundlayers:
    ${allForegroundlayers}`
  );
}

export function showNextForegroundlayer(dispatch) {
  const idx = getActiveForegroundlayerIdx();
  changeForegroundlayer(dispatch, (idx + 1) % FOREGROUNDLAYER_COUNT);
}

export function showPreviousForegroundlayer(dispatch) {
  const oldIdx = getActiveForegroundlayerIdx();
  const newIdx = oldIdx === 0 ? FOREGROUNDLAYER_COUNT - 1 : oldIdx - 1;
  changeForegroundlayer(dispatch, newIdx);
}
