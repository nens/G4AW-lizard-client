import { CHANGE_VIEW } from "../constants/ActionTypes";

export function changeView(newView, dispatch) {
  const changeViewAction = { type: CHANGE_VIEW, newView };
  dispatch(changeViewAction);
}
