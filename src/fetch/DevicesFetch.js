import AppConfig from "src/AppConfig";
import AbstractFetch from "./AbstractFetch";
import AppStore from "./AppFetch";

class DevicesFetch extends AbstractFetch {
  static getAll(criterias = {}) {
    try {
      const limit = criterias?.limit ?? 0;
      let queryParams = "?limit=" + limit;
      if (criterias.page) {
        queryParams += "&page=" + criterias.page;
      }
      return AbstractFetch.fetch(AppConfig.apiUrl + "/devices" + queryParams, {
        method: "GET",
        headers: {
          accept: "application/json",
          authorization: "bearer " + AppStore.fetchToken(),
        },
      }).then((response) => {
        return response.json();
      });
    } catch (e) {
      console.log("Error fetch devices:", e);
      return JSON.stringify([]);
    }
  }

  static createDevice(payload = {}) {
    try {
      return AbstractFetch.fetch(AppConfig.apiUrl + "/devices/create", {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-type": "application/json",
          authorization: "bearer " + AppStore.fetchToken(),
        },
        // body: form,
        body: JSON.stringify(payload),
      }).then((response) => {
        return response.json();
      });
    } catch (e) {
      console.log("Error create device:", e);
      return JSON.stringify([]);
    }
  }

  static getDevice(id) {
    try {
      return AbstractFetch.fetch(AppConfig.apiUrl + `/device/${id}`, {
        method: "GET",
        headers: {
          accept: "application/json",
          authorization: "bearer " + AppStore.fetchToken(),
        },
      }).then((response) => {
        return response.json();
      });
    } catch (e) {
      console.log("Error create device:", e);
      return JSON.stringify([]);
    }
  }

  static editDevice(id, payload = {}) {
    try {
      return AbstractFetch.fetch(AppConfig.apiUrl + `/devices/edit/${id}`, {
        method: "PUT",
        headers: {
          accept: "application/json",
          authorization: "bearer " + AppStore.fetchToken(),
        },
        body: JSON.stringify(payload),
      }).then((response) => {
        return response.json();
      });
    } catch (e) {
      console.log("Error edit device:", e);
      return JSON.stringify([]);
    }
  }

  static delDevice(id) {
    try {
      return AbstractFetch.fetch(AppConfig.apiUrl + `/devices/del/${id}`, {
        method: "DELETE",
        headers: {
          accept: "application/json",
          authorization: "bearer " + AppStore.fetchToken(),
        },
      }).then((response) => {
        return response.json();
      });
    } catch (e) {
      console.log("Error delete device:", e);
      return JSON.stringify([]);
    }
  }

  static pingDevice(ip) {
    try {
      return AbstractFetch.fetch(AppConfig.apiUrl + "/ping", {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-type": "application/json",
          authorization: "bearer " + AppStore.fetchToken(),
        },
        body: JSON.stringify({
          ip_address: ip,
        }),
      }).then((response) => {
        return response.json();
      });
    } catch (e) {
      console.log("Error ping device:", e);
      return JSON.stringify([]);
    }
  }

  static actionDevice(id, payload) {
    try {
      return AbstractFetch.fetch(AppConfig.apiUrl + `/device/action/${id}`, {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-type": "application/json",
          authorization: "bearer " + AppStore.fetchToken(),
        },
        body: JSON.stringify(payload),
      }).then((response) => {
        return response.json();
      });
    } catch (e) {
      console.log("Error action device:", e);
      return JSON.stringify([]);
    }
  }
}
export default DevicesFetch;
