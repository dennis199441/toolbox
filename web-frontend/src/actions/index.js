import * as types from '../constants/ActionTypes';

export const loginAction = payload => ({
  type: types.LOGIN_SUCCESS,
  payload
})