import AppConfig from "../AppConfig";
import AbstractFetch from "./AbstractFetch";
import AppStore from "./AppFetch";

class DemoFuncFetch extends AbstractFetch {
  static getAll(criterias = {}) {
    try {
      const limit = criterias?.limit ?? 0;
      let queryParams = "?limit=" + limit;
      if (criterias.page) {
        queryParams += "&page=" + criterias.page;
      }
      if (criterias.type_demo_func) {
        queryParams += "&type_demo_func=" + criterias.type_demo_func;
      }
      return AbstractFetch.fetch(
        AppConfig.apiUrl + "/services/demo-funcs" + queryParams,
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
      console.log("Error fetch type demo funcs:", e);
      return JSON.stringify([]);
    }
  }

  static importDemoFuncs(criterias = {}) {
    try {
      let queryParams = "";
      if (criterias.device_type_id && criterias.type_demo_func) {
        queryParams += "?device_type_id=" + criterias.device_type_id;
        queryParams += "&type_demo_func=" + criterias.type_demo_func;
      }

      return AbstractFetch.fetch(
        AppConfig.apiUrl + "/services/import-demo-func" + queryParams,
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
      //   console.log("Error fetch import demo funcs:", e);
      //   return JSON.stringify([]);
    }
  }
}
export default DemoFuncFetch;
