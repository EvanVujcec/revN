import { USER_LOGIN, USER_LOGOUT } from '../constants/action-types';

export const userLogin = currentUser => ({
  type: USER_LOGIN,
  payload: currentUser
});

export const userLogout = currentUser => ({
  type: USER_LOGOUT,
  payload: currentUser
});
