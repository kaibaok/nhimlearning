import AppConfig from "src/AppConfig";
import AbstractFetch from "./AbstractFetch";
import AppStore from "./AppFetch";

class TypesDeviceFetch extends AbstractFetch {
  static getAll(criterias = {}) {
    try {
      const limit = criterias?.limit ?? 0;
      let queryParams = "?limit=" + limit;
      if (criterias.page) {
        queryParams += "&page=" + criterias.page;
      }
      return AbstractFetch.fetch(
        AppConfig.apiUrl + "/types-devices" + queryParams,
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

  static createTypesDevice(payload = {}) {
    try {
      return AbstractFetch.fetch(AppConfig.apiUrl + "/types-device/create", {
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
      console.log("Error create types device:", e);
      return JSON.stringify([]);
    }
  }

  static getTypesDevice(id) {
    try {
      return AbstractFetch.fetch(AppConfig.apiUrl + `/types-device/${id}`, {
        method: "GET",
        headers: {
          accept: "application/json",
          authorization: "bearer " + AppStore.fetchToken(),
        },
      }).then((response) => {
        return response.json();
      });
    } catch (e) {
      console.log("Error create types device:", e);
      return JSON.stringify([]);
    }
  }

  static editTypesDevice(id, payload = {}) {
    console.log(payload);
    try {
      return AbstractFetch.fetch(
        AppConfig.apiUrl + `/types-device/edit/${id}`,
        {
          method: "PUT",
          headers: {
            accept: "application/json",
            authorization: "bearer " + AppStore.fetchToken(),
          },
          body: JSON.stringify(payload),
        }
      ).then((response) => {
        return response.json();
      });
    } catch (e) {
      console.log("Error edit types device:", e);
      return JSON.stringify([]);
    }
  }

  static delTypesDevice(id) {
    try {
      return AbstractFetch.fetch(AppConfig.apiUrl + `/types-device/del/${id}`, {
        method: "DELETE",
        headers: {
          accept: "application/json",
          authorization: "bearer " + AppStore.fetchToken(),
        },
      }).then((response) => {
        return response.json();
      });
    } catch (e) {
      console.log("Error delete types device:", e);
      return JSON.stringify([]);
    }
  }
}
export default TypesDeviceFetch;
