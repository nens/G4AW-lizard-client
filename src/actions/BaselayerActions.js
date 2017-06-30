import { CHANGE_BASELAYER } from "../constants/ActionTypes";

export function changeBaselayer(dispatch, index) {
  dispatch({ type: CHANGE_BASELAYER, index });
}
