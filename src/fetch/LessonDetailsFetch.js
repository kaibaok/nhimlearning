import AppConfig from "../AppConfig";
import AbstractFetch from "./AbstractFetch";
// import AppStore from "./AppFetch";

class LessonDetailsFetch extends AbstractFetch {
  static getAll(criterias = {}) {
    try {
      const limit = criterias?.limit ?? 0;
      let queryParams = "?limit=" + limit;
      if (criterias.page) {
        queryParams += "&page=" + criterias.page;
      }
      if (criterias.lesson_id) {
        queryParams += "&lesson_id=" + criterias.lesson_id;
      }
      if (criterias.order_field && criterias.order_direction) {
        queryParams +=
          "&order_field=" +
          criterias.order_field +
          "&order_direction=" +
          criterias.order_direction;
      }
      return AbstractFetch.fetch(
        AppConfig.apiUrl + "/lesson-details" + queryParams,
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
      console.log("Error fetch lessons:", e);
      return JSON.stringify([]);
    }
  }
}
export default LessonDetailsFetch;
