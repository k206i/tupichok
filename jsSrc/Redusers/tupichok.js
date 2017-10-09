import {
  DEFAULT_TAB,
  SET_TAB,
} from '../Constants/';

const initialState = {
  activeTab: DEFAULT_TAB,
};

export default function tupichok(state = initialState, action) {

  switch (action.type) {
    case SET_TAB:
      return {...state, activeTab: action.payload};
    default:
      return state;
  }

}