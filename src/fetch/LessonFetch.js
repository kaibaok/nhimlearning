import AppConfig from "../AppConfig";
import AbstractFetch from "./AbstractFetch";
import AppStore from "./AppFetch";

class LessonFetch extends AbstractFetch {
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
      if (criterias.order_field && criterias.order_direction) {
        queryParams +=
          "&order_field=" +
          criterias.order_field +
          "&order_direction=" +
          criterias.order_direction;
      }
      return AbstractFetch.fetch(AppConfig.apiUrl + "/lessons" + queryParams, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      }).then((response) => {
        return response.json();
      });
    } catch (e) {
      console.log("Error fetch lessons:", e);
      return JSON.stringify([]);
    }
  }

  static createLesson(payload = {}) {
    try {
      return AbstractFetch.fetch(
        AppConfig.apiUrl + "/lesson/create?token=" + AppStore.fetchToken(),
        {
          method: "POST",
          headers: {
            accept: "application/json",
          },
          // body: form,
          body: JSON.stringify(payload),
        }
      ).then((response) => {
        return response.json();
      });
    } catch (e) {
      console.log("Error create lesson:", e);
      return JSON.stringify([]);
    }
  }

  static getLesson(id) {
    try {
      return AbstractFetch.fetch(AppConfig.apiUrl + `/lesson/${id}`, {
        method: "GET",
        headers: {
          accept: "application/json",
        },
      }).then((response) => {
        return response.json();
      });
    } catch (e) {
      console.log("Error create lesson:", e);
      return JSON.stringify([]);
    }
  }

  static editLesson(id, payload = {}) {
    try {
      return AbstractFetch.fetch(
        AppConfig.apiUrl + `/lesson/edit/${id}?token=` + AppStore.fetchToken(),
        {
          method: "POST",
          headers: {
            accept: "application/json",
          },
          body: JSON.stringify(payload),
        }
      ).then((response) => {
        return response.json();
      });
    } catch (e) {
      console.log("Error edit lesson:", e);
      return JSON.stringify([]);
    }
  }

  static delLesson(id) {
    try {
      return AbstractFetch.fetch(
        AppConfig.apiUrl +
          `/lesson/del/${id}` +
          "?token=" +
          AppStore.fetchToken(),
        {
          method: "GET",
          headers: {
            accept: "application/json",
          },
        }
      ).then((response) => {
        return response.json();
      });
    } catch (e) {
      console.log("Error delete lesson:", e);
      return JSON.stringify([]);
    }
  }
}
export default LessonFetch;
