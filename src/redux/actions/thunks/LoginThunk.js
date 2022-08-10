import { onAppLogined } from "../Actions";

export function appLogined(payload) {
  return function (dispatch) {
    dispatch(
      onAppLogined({
        token: payload?.token,
        userInfo: payload?.userInfo,
      })
    );
  };
}
