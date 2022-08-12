/**
 * Class used to store keys/tokens in the browser storage
 */
class AppStore {
  static fetchVoices() {
    if (typeof Storage !== "undefined") {
      // Code for localStorage/sessionStorage.
      var voices = localStorage.getItem("voices");
      if (voices != null) {
        return JSON.parse(voices);
      }
    }
    return null;
  }

  /**
   * Stores the voices in storage
   * @param voices
   */
  static storeVoices(voices) {
    if (typeof Storage !== "undefined") {
      // Code for localStorage/sessionStorage.
      localStorage.setItem("voices", JSON.stringify(voices));
    }
  }

  /**
   * Returns the token, undefined if None
   */
  static fetchToken() {
    if (typeof Storage !== "undefined") {
      // Code for localStorage/sessionStorage.
      var key = localStorage.getItem("token");
      if (key != null) {
        return key;
      }
    }
  }

  /**
   * Stores the token in storage
   * @param token
   */
  static storeToken(token) {
    if (typeof Storage !== "undefined") {
      // Code for localStorage/sessionStorage.
      localStorage.setItem("token", token);
    }
  }

  /**
   * Deletes the token from storage
   * @param token
   */
  static deleteToken() {
    if (typeof Storage !== "undefined") {
      // Code for localStorage/sessionStorage.
      localStorage.removeItem("token");
    }
  }

  /**
   * Returns the user info, undefined if None
   */
  static fetchUserInfo() {
    if (typeof Storage !== "undefined") {
      // Code for localStorage/sessionStorage.
      var uinfo = localStorage.getItem("user_info");
      if (uinfo != null) {
        return JSON.parse(uinfo);
      }
    }
    return null;
  }

  /**
   * Stores the user info in storage
   * @param userInfo
   */
  static storeUserInfo(userInfo) {
    if (typeof Storage !== "undefined") {
      // Code for localStorage/sessionStorage.
      localStorage.setItem("user_info", JSON.stringify(userInfo));
    }
  }

  /**
   * Deletes the user info from storage
   */
  static deleteUserInfo() {
    if (typeof Storage !== "undefined") {
      // Code for localStorage/sessionStorage.
      localStorage.removeItem("user_info");
    }
  }
}

export default AppStore;
