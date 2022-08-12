import {
  LOGIN_REQUEST_STARTED,
  LOGIN_REQUEST_REQUEST_ERROR,
  LOGIN_REQUEST_FETCHED,
} from "../actions/LoginAction";

const initialState = {
  token: "",
  userInfo: null,
};

function loginReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST_STARTED:
      return {
        ...state,
        isFetching: true,
        token: "",
        userInfo: null,
      };
    case LOGIN_REQUEST_REQUEST_ERROR:
      return {
        ...state,
        isFetching: false,
        userInfo: action.userInfo,
        token: action.token,
      };
    case LOGIN_REQUEST_FETCHED:
      return {
        ...state,
        isFetching: false,
        appError: action.error,
        token: "",
        userInfo: null,
      };
    default:
      return state;
  }
}
export default loginReducer;
