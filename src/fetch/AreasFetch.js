import AppConfig from "../AppConfig";
import AbstractFetch from "./AbstractFetch";
import AppStore from "./AppFetch";

class AreasFetch extends AbstractFetch {
  static getAll(criterias = {}) {
    try {
      const limit = criterias?.limit ?? 0;
      let queryParams = "?limit=" + limit;
      if (criterias.page) {
        queryParams += "&page=" + criterias.page;
      }
      if (criterias.name) {
        queryParams += "&name=" + criterias.name;
      }
      if (criterias.full_name) {
        queryParams += "&full_name=" + criterias.full_name;
      }
      if (criterias.order_field && criterias.order_direction) {
        queryParams +=
          "&order_field=" +
          criterias.order_field +
          "&order_direction=" +
          criterias.order_direction;
      }
      return AbstractFetch.fetch(AppConfig.apiUrl + "/areas" + queryParams, {
        method: "GET",
        headers: {
          accept: "application/json",
        },
      }).then((response) => {
        return response.json();
      });
    } catch (e) {
      console.log("Error fetch areas:", e);
      return JSON.stringify([]);
    }
  }

  static createArea(payload = {}) {
    try {
      return AbstractFetch.fetch(
        AppConfig.apiUrl + "/area/create?token=" + AppStore.fetchToken(),
        {
          method: "POST",
          headers: {
            accept: "application/json",
          },
          cache: "no-cache",
          body: JSON.stringify(payload),
        }
      ).then((response) => {
        return response.json();
      });
    } catch (e) {
      console.log("Error create types device:", e);
      return JSON.stringify([]);
    }
  }

  static getArea(id) {
    try {
      return AbstractFetch.fetch(AppConfig.apiUrl + `/area/${id}`, {
        method: "GET",
        headers: {
          accept: "application/json",
        },
      }).then((response) => {
        return response.json();
      });
    } catch (e) {
      console.log("Error create types device:", e);
      return JSON.stringify([]);
    }
  }

  static editArea(id, payload = {}) {
    try {
      return AbstractFetch.fetch(
        AppConfig.apiUrl + `/area/edit/${id}?token=` + AppStore.fetchToken(),
        {
          method: "POST",
          headers: {
            accept: "application/json",
          },
          cache: "no-cache",
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

  static delArea(id) {
    try {
      return AbstractFetch.fetch(
        AppConfig.apiUrl +
          `/area/del/${id}
          ?token=` +
          AppStore.fetchToken(),
        {
          method: "GET",
          headers: {
            accept: "application/json",
          },
          cache: "no-cache",
        }
      ).then((response) => {
        return response.json();
      });
    } catch (e) {
      console.log("Error delete types device:", e);
      return JSON.stringify([]);
    }
  }
}
export default AreasFetch;
