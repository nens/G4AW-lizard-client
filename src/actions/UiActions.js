import { CHANGE_VIEW } from "../constants/ActionTypes";

export function changeView(newView) {
  console.log("[F] changeView; newView =", newView);
  return {
    type: CHANGE_VIEW,
    newView
  };
}
