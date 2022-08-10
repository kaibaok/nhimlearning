/**
 * Generic Fetch Actions
 *
 */
export const REQUEST_STARTED = "REQUEST_STARTED";
export function requestStarted() {
  return {
    type: REQUEST_STARTED,
    isFetching: true,
  };
}

export const REQUEST_COMPLETED = "REQUEST_COMPLETED";
export function requestStopped() {
  return {
    type: REQUEST_COMPLETED,
    isFetching: false,
  };
}

export const APP_ERROR = "APP_ERROR";
export function onAppError(error) {
  return {
    type: APP_ERROR,
    error: error,
  };
}

export const CLEAR_APP_ERROR = "CLEAR_APP_ERROR";
export function clearAppError() {
  return {
    type: CLEAR_APP_ERROR,
    error: null,
  };
}

export const SESSION_EXPIRED = "SESSION_EXPIRED";
export function handleSessionExpired() {
  return {
    type: SESSION_EXPIRED,
  };
}

export const APP_LOGINED = "APP_LOGINED";
export function onAppLogined(payload) {
  return {
    type: APP_LOGINED,
    isLogined: true,
    token: payload?.token,
    userInfo: payload?.userInfo,
  };
}

export const NAVI_CHANGE = "NAVI_CHANGE";
export function onNaviChange(sidebarShow) {
  return {
    sidebarShow: sidebarShow,
  };
}
