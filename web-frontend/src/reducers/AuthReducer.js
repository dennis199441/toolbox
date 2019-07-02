import {
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  LOGIN_FAILED
} from '../constants/ActionTypes'

const initialState = {
  isAuthenticated: false,
  payload: {}
}

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      console.log('LOGIN SUCCESS');
      return {
        isAuthenticated: true,
        payload: {"msg": "Login Success!"}
      }
    case LOGOUT_SUCCESS:
      return {
        isAuthenticated: false,
        payload: {"msg": "Logout Success!"}
      }
    case LOGIN_FAILED:
      return {
        isAuthenticated: false,
        payload: {"msg": "Login Failed!"}
      }
    default:
      return state
  }
}

export default AuthReducer;