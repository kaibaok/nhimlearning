import AppStore from "./fetch/AppFetch";
import LoginFetch from "./fetch/LoginFetch";

/**
 * Class used to verify the user is logged in and can access data. Uses a mock login system for now
 *
 */
class AppAuth {
  static loggedIn = () => {
    return AppStore.fetchUserInfo() !== null;
  };

  /**
   * Logs into the service with the specified email and password, returns a Promise
   *
   * @param email: String
   * @param password: String
   * @returns {Promise.<TResult>}
   */
  static login = (email, password, isRemember = false) => {
    return LoginFetch.login(email, password, isRemember).then((json) => {
      const token = json?.access_token ?? "";
      AppStore.storeToken(token);
      return AppAuth.getUserInfo().then((json) => {
        return { token: token, userInfo: json };
      });
    });
  };

  /**
   * If the user has previously logged in, this will poll the server to validate their token is valid and retreive
   * the API key needed to make further calls.
   *
   * @returns {Promise.<TResult>}
   */
  static getUserInfo = () => {
    return LoginFetch.findUserInfo().then((json) => {
      AppStore.storeUserInfo(json);
      return json ?? null;
    });
  };

  /**
   * Logs the user out
   */
  static logout = () => {
    return LoginFetch.logout()
      .then((json) => {
        AppStore.deleteToken();
        AppStore.deleteUserInfo();
        // Open login screen
        window.location = "/admin/login";

        // return the caller a promise that will never resolve so they don't think they need to report an error.
        return new Promise(() => {
          setTimeout(function () {});
        });
      })
      .catch((error) => {
        console.log("Caught an error logging out", error);
        window.location = "/admin/login";
      });
  };
}

export default AppAuth;
