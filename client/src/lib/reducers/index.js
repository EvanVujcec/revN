import { USER_LOGIN, USER_LOGOUT } from '../constants/action-types';

const initialState = {
  isLoggedIn: false
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return { ...state, isLoggedIn: true, currentUser: action.currentUser };
    case USER_LOGOUT:
      return { ...state, isLoggedIn: false, currentUser: null };

    default:
      break;
  }
};

export default rootReducer;
