import { CHANGE_FOREGROUNDLAYER } from "../constants/ActionTypes";

export function changeForegroundlayer(dispatch, index) {
  dispatch({ type: CHANGE_FOREGROUNDLAYER, index });
}
