import AppConfig from "src/AppConfig";
import AbstractFetch from "./AbstractFetch";
import AppStore from "./AppFetch";

class TypeDemoFuncFetch extends AbstractFetch {
  static getAll(criterias = {}) {
    try {
      const limit = criterias?.limit ?? 0;
      let queryParams = "?limit=" + limit;
      if (criterias.page) {
        queryParams += "&page=" + criterias.page;
      }
      return AbstractFetch.fetch(
        AppConfig.apiUrl + "/services/type-demo-funcs" + queryParams,
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
}
export default TypeDemoFuncFetch;
