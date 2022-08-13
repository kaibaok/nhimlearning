import AppConfig from "../AppConfig";
import AbstractFetch from "./AbstractFetch";

class FilesFetch extends AbstractFetch {
  static upload(payload = {}) {
    try {
      return fetch(AppConfig.baseUrl + "/media/upload-files", {
        method: "POST",
        body: payload,
      }).then((response) => {
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
      var form = new FormData();
      form.append("files", payload?.files);

      return AbstractFetch.fetch(AppConfig.apiUrl + "/media/delete-items", {
        method: "POST",
        headers: {
          accept: "application/json",
        },
        body: form,
      }).then((response) => {
        return response.json();
      });
    } catch (e) {
      console.log(e);
      return JSON.stringify([]);
    }
  }
}

export default FilesFetch;
