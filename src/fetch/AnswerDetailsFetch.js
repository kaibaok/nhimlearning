import AppConfig from "../AppConfig";
import AbstractFetch from "./AbstractFetch";
import AppStore from "./AppFetch";

class AnswerDetailsFetch extends AbstractFetch {
  static getAll(criterias = {}) {
    try {
      const limit = criterias?.limit ?? 0;
      let queryParams = "?limit=" + limit;
      if (criterias.page) {
        queryParams += "&page=" + criterias.page;
      }
      if (criterias.question_id) {
        queryParams += "&question_id=" + criterias.question_id;
      }
      if (criterias.order_field && criterias.order_direction) {
        queryParams +=
          "&order_field=" +
          criterias.order_field +
          "&order_direction=" +
          criterias.order_direction;
      }
      return AbstractFetch.fetch(
        AppConfig.apiUrl + "/answer-details" + queryParams,
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
      console.log("Error fetch answer details:", e);
      return JSON.stringify([]);
    }
  }

  static createAnswers(payload = {}, id) {
    console.log(payload);
    try {
      return AbstractFetch.fetch(
        AppConfig.apiUrl +
          "/answer-detail/" +
          id +
          "/create-list?token=" +
          AppStore.fetchToken(),
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
      console.log("Error create answers:", e);
      return JSON.stringify([]);
    }
  }

  // static getQuestion(id) {
  //   try {
  //     return AbstractFetch.fetch(AppConfig.apiUrl + `/question/${id}`, {
  //       method: "GET",
  //       headers: {
  //         accept: "application/json",
  //         authorization: "bearer " + AppStore.fetchToken(),
  //       },
  //     }).then((response) => {
  //       return response.json();
  //     });
  //   } catch (e) {
  //     console.log("Error create question type:", e);
  //     return JSON.stringify([]);
  //   }
  // }

  // static editQuestion(id, payload = {}) {
  //   try {
  //     return AbstractFetch.fetch(AppConfig.apiUrl + `/question/edit/${id}`, {
  //       method: "PUT",
  //       headers: {
  //         accept: "application/json",
  //         authorization: "bearer " + AppStore.fetchToken(),
  //       },
  //       body: JSON.stringify(payload),
  //     }).then((response) => {
  //       return response.json();
  //     });
  //   } catch (e) {
  //     console.log("Error edit question type:", e);
  //     return JSON.stringify([]);
  //   }
  // }

  // static delQuestion(id) {
  //   try {
  //     return AbstractFetch.fetch(AppConfig.apiUrl + `/question/del/${id}`, {
  //       method: "DELETE",
  //       headers: {
  //         accept: "application/json",
  //         authorization: "bearer " + AppStore.fetchToken(),
  //       },
  //     }).then((response) => {
  //       return response.json();
  //     });
  //   } catch (e) {
  //     console.log("Error delete question type:", e);
  //     return JSON.stringify([]);
  //   }
  // }
}
export default AnswerDetailsFetch;
