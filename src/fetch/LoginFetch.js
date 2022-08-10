import AppConfig from "src/AppConfig";
import AppStore from "./AppFetch";

class LoginFetch {
  static handleErrors(response) {
    if (response.ok) {
      return response;
    }
    console.log("ERROR: " + response.status);
    throw Error(response.status);
  }

  static login(email, password, isRemember) {
    var form = new FormData();
    form.append("email", email);
    form.append("password", password);
    form.append("remember_me", isRemember);

    return fetch(AppConfig.loginUrl, {
      method: "POST",
      headers: {
        accept: "application/json",
      },
      body: form,
    })
      .then(LoginFetch.handleErrors)
      .then((response) => response.json());
  }

  static findUserInfo() {
    return fetch(AppConfig.findUserInfoUrl, {
      headers: {
        accept: "application/json",
        authorization: "bearer " + AppStore.fetchToken(),
      },
      method: "GET",
    })
      .then(LoginFetch.handleErrors)
      .then((response) => response.json());
  }

  static logout() {
    return fetch(AppConfig.logoutUrl, {
      method: "POST",
      headers: {
        accept: "application/json",
        authorization: "bearer " + AppStore.fetchToken(),
      },
    }).then((response) => {
      if (!response.ok) {
        console.log(
          "ERROR, but resume next. Status: " +
            response.status +
            " " +
            response.statusText
        );
        throw Error(response.status);
      }
      return response.json();
    });
  }

  static register(payload) {
    var form = new FormData();
    form.append("name", payload.name);
    form.append("password", payload.password);
    form.append("email", payload.email);
    form.append("password_confirmation", payload.password_confirmation);

    return fetch(AppConfig.registerUrl, {
      method: "POST",
      headers: {
        accept: "application/json",
      },
      body: form,
    })
      .then(LoginFetch.handleErrors)
      .then((response) => response.json());
  }
}
export default LoginFetch;