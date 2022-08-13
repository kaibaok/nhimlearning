import AppConfig from "../AppConfig";
import AbstractFetch from "./AbstractFetch";
import AppStore from "./AppFetch";

class FilesFetch extends AbstractFetch {
  static upload(payload = {}) {
    try {
      return AbstractFetch.fetch(
        AppConfig.apiUrl + "/media/upload-files?token=" + AppStore.fetchToken(),
        {
          method: "POST",
          body: payload,
        }
      ).then((response) => {
        return response.json();
      });
    } catch (e) {
      console.log(e);
      return JSON.stringify([]);
    }
  }

  static listImages() {
    try {
      return AbstractFetch.fetch(AppConfig.apiUrl + "/media/list-images", {
        method: "GET",
        headers: {
          accept: "application/json",
        },
      }).then((response) => {
        return response.json();
      });
    } catch (e) {
      console.log(e);
      return JSON.stringify([]);
    }
  }

  static listVideos() {
    try {
      return AbstractFetch.fetch(AppConfig.apiUrl + "/media/list-videos", {
        method: "GET",
        headers: {
          accept: "application/json",
        },
      }).then((response) => {
        return response.json();
      });
    } catch (e) {
      console.log(e);
      return JSON.stringify([]);
    }
  }

  static deleteItems(payload = {}) {
    try {
      return AbstractFetch.fetch(
        AppConfig.apiUrl + "/media/delete-items?token=" + AppStore.fetchToken(),
        {
          method: "DELETE",
          headers: {
            accept: "application/json",
          },
          body: JSON.stringify(payload),
        }
      ).then((response) => {
        return response.json();
      });
    } catch (e) {
      console.log(e);
      return JSON.stringify([]);
    }
  }
}

export default FilesFetch;
