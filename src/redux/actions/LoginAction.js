export const LOGIN_REQUEST_STARTED = "LOGIN_REQUEST_STARTED";
export function loginRequestStarted() {
  return {
    type: LOGIN_REQUEST_STARTED,
    isFetching: true,
  };
}

export const LOGIN_REQUEST_FETCHED = "LOGIN_REQUEST_FETCHED";
export function loginRequestFetched() {
  return {
    type: LOGIN_REQUEST_FETCHED,
    isFetching: false,
  };
}

export const LOGIN_REQUEST_REQUEST_ERROR = "LOGIN_REQUEST_REQUEST_ERROR";
export function loginRequestError() {
  return {
    type: LOGIN_REQUEST_REQUEST_ERROR,
  };
}
