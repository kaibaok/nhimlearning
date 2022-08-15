const isIP = true;
const ip = isIP
  ? "http://smarthome.local"
  : "https://nhimlearning.000webhostapp.com";
const apiHost = ip + "/public";
const host = ip;

const AppConfig = {
  baseUrl: apiHost,
  apiUrl: apiHost + "/api",
  loginUrl: apiHost + "/api/auth/login",
  registerUrl: apiHost + "/api/auth/register",
  findUserInfoUrl: apiHost + "/api/auth/user-profile",
  logoutUrl: apiHost + "/api/auth/logout",
  enableLoginUser: process.env.REACT_APP_ENV === "dev", 
  storageUrl: host + "/storage/app/public/",
  weatherKey: "a2b7d4f8c22fab9b659e7b35eb731cf7",
  apiWeather: "https://api.openweathermap.org/data/2.5/weather",
  apiImgWeather: "http://openweathermap.org/img/wn/",

  enabledModuleDevices: true,
  enabledModuleLearning: true,
  enabledModuleChat: true,
  enabledModuleMedia: true,
};

export default AppConfig;
