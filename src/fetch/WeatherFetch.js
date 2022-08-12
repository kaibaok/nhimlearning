import AppConfig from "src/AppConfig";
import AbstractFetch from "./AbstractFetch";
import AppStore from "./AppFetch";

class WeatherFetch extends AbstractFetch {
  static get(criterias = {}) {
    try {
      let url = AppConfig.apiWeather + "?appid=" + AppConfig.weatherKey;
      if (criterias.lon) {
        url += "&lon=" + criterias.lon;
      }
      if (criterias.lat) {
        url += "&lat=" + criterias.lat;
      }
      url += "&units=metric";
      return AbstractFetch.fetch(AppConfig.apiUrl + "/get-data-no-cors", {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-type": "application/json",
          authorization: "bearer " + AppStore.fetchToken(),
        },
        body: JSON.stringify({
          url: url,
        }),
        
      }).then((response) => {
        return response.json();
      });
    } catch (e) {
      console.log("Error fetch weather :", e);
      return JSON.stringify([]);
    }
  }
}

export default WeatherFetch;
