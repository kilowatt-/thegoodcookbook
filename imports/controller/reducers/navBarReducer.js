import {BROWSE_FAVORITES, BROWSE_ADDED, BROWSE_ALL, HOME} from '../actions/navBar.js';
import { NavBarTabs } from '../../model/NavBarTabs.js';

export const navBarReducer = (state = NavBarTabs.HOME, action) => {
  if(action.type === BROWSE_FAVORITES) {
    return NavBarTabs.FAVORITES;
  } else if (action.type === BROWSE_ADDED) {
    return NavBarTabs.ADDED;
  } else if (action.type === BROWSE_ALL) {
    return NavBarTabs.ALL;
  } else if (action.type === HOME) {
    return NavBarTabs.HOME;
  } else {
    return state;
  }
}
