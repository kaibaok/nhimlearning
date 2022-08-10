import AppConfig from "src/AppConfig";
import AbstractFetch from "./AbstractFetch";
import AppStore from "./AppFetch";

class DeviceFuncFetch extends AbstractFetch {
  static getAll(criterias = {}) {
    try {
      const limit = criterias?.limit ?? 0;
      let queryParams = "?limit=" + limit;
      if (criterias.page) {
        queryParams += "&page=" + criterias.page;
      }
      if (criterias.device_type_id) {
        queryParams += "&device_type_id=" + criterias.device_type_id;
      }
      return AbstractFetch.fetch(
        AppConfig.apiUrl + "/device-funcs" + queryParams,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            authorization: "bearer " + AppStore.fetchToken(),
          },
        }
      ).then((response) => {
        return response.json();
      });
    } catch (e) {
      console.log("Error fetch devices:", e);
      return JSON.stringify([]);
    }
  }

  static createDeviceFunc(payload = {}) {
    try {
      return AbstractFetch.fetch(AppConfig.apiUrl + "/device-func/create", {
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
      console.log("Error create device function:", e);
      return JSON.stringify([]);
    }
  }

  static getDeviceFunc(id) {
    try {
      return AbstractFetch.fetch(AppConfig.apiUrl + `/device-func/${id}`, {
        method: "GET",
        headers: {
          accept: "application/json",
          authorization: "bearer " + AppStore.fetchToken(),
        },
      }).then((response) => {
        return response.json();
      });
    } catch (e) {
      console.log("Error create device function:", e);
      return JSON.stringify([]);
    }
  }

  static editDeviceFunc(id, payload = {}) {
    try {
      return AbstractFetch.fetch(AppConfig.apiUrl + `/device-func/edit/${id}`, {
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
      console.log("Error edit device function:", e);
      return JSON.stringify([]);
    }
  }

  static delDeviceFunc(id) {
    try {
      return AbstractFetch.fetch(AppConfig.apiUrl + `/device-func/del/${id}`, {
        method: "DELETE",
        headers: {
          accept: "application/json",
          authorization: "bearer " + AppStore.fetchToken(),
        },
      }).then((response) => {
        return response.json();
      });
    } catch (e) {
      console.log("Error delete device function:", e);
      return JSON.stringify([]);
    }
  }
}
export default DeviceFuncFetch;
