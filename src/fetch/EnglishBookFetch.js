import AppConfig from "../AppConfig";
import AbstractFetch from "./AbstractFetch";
import AppStore from "./AppFetch";

class EnglishBookFetch extends AbstractFetch {
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

      return AbstractFetch.fetch(
        AppConfig.apiUrl + "/english-books" + queryParams,
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
      console.log("Error fetch english books:", e);
      return JSON.stringify([]);
    }
  }

  static createEnglishBook(payload = {}) {
    try {
      return AbstractFetch.fetch(
        AppConfig.apiUrl +
          "/english-book/create?token=" +
          AppStore.fetchToken(),
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
      console.log("Error create english book:", e);
      return JSON.stringify([]);
    }
  }

  static getEnglishBook(id) {
    try {
      return AbstractFetch.fetch(AppConfig.apiUrl + `/english-book/${id}`, {
        method: "GET",
        headers: {
          accept: "application/json",
        },
      }).then((response) => {
        return response.json();
      });
    } catch (e) {
      console.log("Error create english book:", e);
      return JSON.stringify([]);
    }
  }

  static editEnglishBook(id, payload = {}) {
    try {
      return AbstractFetch.fetch(
        AppConfig.apiUrl +
          `/english-book/edit/${id}?token=` +
          AppStore.fetchToken(),
        {
          method: "PUT",
          headers: {
            accept: "application/json",
          },
          body: JSON.stringify(payload),
        }
      ).then((response) => {
        return response.json();
      });
    } catch (e) {
      console.log("Error edit english book:", e);
      return JSON.stringify([]);
    }
  }

  static delEnglishBook(id) {
    try {
      return AbstractFetch.fetch(
        AppConfig.apiUrl +
          `/english-book/del/${id}?token=` +
          AppStore.fetchToken(),
        {
          method: "DELETE",
          headers: {
            accept: "application/json",
          },
        }
      ).then((response) => {
        return response.json();
      });
    } catch (e) {
      console.log("Error delete english book:", e);
      return JSON.stringify([]);
    }
  }
}
export default EnglishBookFetch;
