import {
  SET_TAB,
} from '../Constants/';

export function setTab(tabName) {

  return {
    type: SET_TAB,
    payload: tabName
  }
}
