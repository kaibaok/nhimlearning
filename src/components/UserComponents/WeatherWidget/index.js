import { useState } from "react";
import { useEffect } from "react";
import AppConfig from "src/AppConfig";
import WeatherFetch from "src/fetch/WeatherFetch";

const WeatherWidget = (props) => {
  const [lon, setLon] = useState();
  const [lat, setLat] = useState();
  // const [weather, setWeather] = useState();
  const [image, setImage] = useState();
  const [city, setCity] = useState();
  const [temp, setTemp] = useState(0);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLon(position.coords.longitude);
      setLat(position.coords.latitude);
    });
  }, []);

  useEffect(() => {
    const loadWeather = async () => {
      await WeatherFetch.get({ lon: lon, lat: lat })
        .then((weather) => {
          if (weather) {
            setImage(
              AppConfig.apiImgWeather + weather?.weather[0]?.icon + ".png"
            );
            setCity(weather?.name);
            setTemp(parseInt(weather?.main?.temp));
          }
        })
        .catch((ex) => {
          console.log("error not found location weather", ex);
        });
    };
    if (lon && lat) {
      loadWeather();
    }
  }, [lon, lat]);

  if (!lon && !lat) return null;

  return (
    <div className="temp d-none d-lg-block">
      <div className="temp_wap">
        <div className="temp_icon">
          {image && <img src={image} alt="temp icon" />}
        </div>
        <h3 className="temp_count">{temp}</h3>
        <p>{city}</p>
      </div>
    </div>
  );
};

export default WeatherWidget;
