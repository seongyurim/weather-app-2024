import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import WeatherBox from './component/WeatherBox';
import Locations from './component/Locations';
import Details from './component/Details';
import ClipLoader from "react-spinners/ClipLoader";

const cities = ['Dublin', 'Edinburgh', 'Hong Kong', 'Wien'];
const API_KEY = "7d14207953b97208eecfcca8a8f46279";

function App() {

  const [loading, setLoading] = useState(false);
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState(null);

  // 현재 위치의 경도와 위도 가져오기
  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      getWeatherByCurrentLocation(lat, lon); // 다른 함수에 위도, 경도 값 넘기기
    });
  }

  // 현재 위치(경도, 위도)를 기반으로 날씨 객체 받아오기
  const getWeatherByCurrentLocation = async(lat, lon) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    setLoading(true); // API 데이터 fetch 전이므로 로딩스피너 보여주기
    let response = await fetch(url);
    let data = await response.json();
    setWeather(data); // 받아온 날씨 정보를 weather 상태변수에 담기
    setLoading(false); // 데이터 fetch가 완료되었으므로 로딩스피너 가리기
  }

  // 도시명을 기반으로 날씨 객체 받아오기
  const getWeatherByCity = async() => {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    setLoading(true);
    let response = await fetch(url);
    let data = await response.json();
    setWeather(data);
    setLoading(false);
  }

  useEffect(() => {
    if (city == null) {
      getCurrentLocation();
    } else {
      getWeatherByCity();
    }
  }, [city]);

  const handleCityChange = (city) => {
    if (city === "current") {
      setCity(null);
    } else {
      setCity(city);
    }
  }

  return (
    <div className="wrapper-left-inner">
      {loading ? (
        <div className="container">
          <ClipLoader color="#fff" loading={loading} size={100} />
        </div>
      ): (
        <div className="container">
          <div className="wrapper-left">
            <WeatherBox weather={weather}/>
          </div>
          <div className="wrapper-right">
            <Details weather={weather}/>
            <Locations cities={cities} setCity={setCity} handleCityChange={handleCityChange}
              selectedCity={city}/>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
