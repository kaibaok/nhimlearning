import AppConfig from "src/AppConfig";
import AbstractFetch from "./AbstractFetch";
import AppStore from "./AppFetch";

class QuestionTypeFetch extends AbstractFetch {
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
        AppConfig.apiUrl + "/question-types" + queryParams,
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
      console.log("Error fetch question types:", e);
      return JSON.stringify([]);
    }
  }

  static createQuestionType(payload = {}) {
    try {
      return AbstractFetch.fetch(AppConfig.apiUrl + "/question-type/create", {
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
      console.log("Error create question type:", e);
      return JSON.stringify([]);
    }
  }

  static getQuestionType(id) {
    try {
      return AbstractFetch.fetch(AppConfig.apiUrl + `/question-type/${id}`, {
        method: "GET",
        headers: {
          accept: "application/json",
          authorization: "bearer " + AppStore.fetchToken(),
        },
      }).then((response) => {
        return response.json();
      });
    } catch (e) {
      console.log("Error create question type:", e);
      return JSON.stringify([]);
    }
  }

  static editQuestionType(id, payload = {}) {
    try {
      return AbstractFetch.fetch(
        AppConfig.apiUrl + `/question-type/edit/${id}`,
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
      console.log("Error edit question type:", e);
      return JSON.stringify([]);
    }
  }

  static delQuestionType(id) {
    try {
      return AbstractFetch.fetch(
        AppConfig.apiUrl + `/question-type/del/${id}`,
        {
          method: "DELETE",
          headers: {
            accept: "application/json",
            authorization: "bearer " + AppStore.fetchToken(),
          },
        }
      ).then((response) => {
        return response.json();
      });
    } catch (e) {
      console.log("Error delete question type:", e);
      return JSON.stringify([]);
    }
  }
}
export default QuestionTypeFetch;
