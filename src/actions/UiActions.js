import { CHANGE_VIEW } from "../constants/ActionTypes";

export function changeView(dispatch, newView) {
  const changeViewAction = { type: CHANGE_VIEW, newView };
  dispatch(changeViewAction);
}
