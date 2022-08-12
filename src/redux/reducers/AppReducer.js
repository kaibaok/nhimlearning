import {
  REQUEST_STARTED,
  REQUEST_COMPLETED,
  APP_ERROR,
  CLEAR_APP_ERROR,
  SESSION_EXPIRED,
  APP_LOGINED,
  NAVI_CHANGE,
} from "../actions/Actions";

const initialState = {
  appError: null,
  sessionExpired: false,
  isLogined: false,
  token: "",
  userInfo: null,
  sidebarShow: false,
};

function appReducer(state = initialState, action) {
  switch (action.type) {
    case REQUEST_STARTED:
      return {
        ...state,
        isFetching: true,
      };
    case REQUEST_COMPLETED:
      return {
        ...state,
        isFetching: false,
      };
    case APP_ERROR:
      return {
        ...state,
        isFetching: false,
        appError: action.error,
      };
    case CLEAR_APP_ERROR:
      return {
        ...state,
        isFetching: false,
        appError: null,
      };
    case SESSION_EXPIRED:
      return {
        ...state,
        sessionExpired: true,
      };
    case APP_LOGINED:
      return {
        ...state,
        isLogined: true,
        token: action.token,
        userInfo: action.userInfo,
        sessionExpired: false,
      };
    case NAVI_CHANGE:
      return {
        ...state,
        sidebarShow: action.sidebarShow,
      };
    default:
      return state;
  }
}
export default appReducer;
