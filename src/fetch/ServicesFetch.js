import AppConfig from "../AppConfig";
import AbstractFetch from "./AbstractFetch";
import AppStore from "./AppFetch";

class ServicesFetch extends AbstractFetch {
  static testFunc(payload) {
    try {
      return AbstractFetch.fetch(
        AppConfig.apiUrl + "/services/device-test-func",
        {
          method: "POST",
          headers: {
            accept: "application/json",
            "Content-type": "application/json",
            authorization: "bearer " + AppStore.fetchToken(),
          },
          body: JSON.stringify(payload),
        }
      ).then((response) => {
        return response.json();
      });
    } catch (e) {
      console.log("Error test function :", e);
      return JSON.stringify([]);
    }
  }
}
export default ServicesFetch;
