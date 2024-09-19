import { useState, useEffect } from 'react';
import WeatherBox from './component/WeatherBox';
import Locations from './component/Locations';
import Details from './component/Details';
import ClipLoader from "react-spinners/ClipLoader";
import resetImg from '../src/asset/reset.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const cities = ['Dublin', 'Montreal', 'Hong Kong', 'Vienna'];
const API_KEY = process.env.REACT_APP_API_KEY;

function App() {

  const [loading, setLoading] = useState(false); // 로딩스피너
  const [weather, setWeather] = useState(null); // 날씨설정
  const [city, setCity] = useState(null); // 도시설정
  const [reloading, setReloading] = useState(false); // 동일 위치 리로드
  const [apiError, setApiError] = useState(""); // API 호출 에러 핸들링

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
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
      setLoading(true);
      let response = await fetch(url);
      let data = await response.json();
      setWeather(data);
      setLoading(false);
    }
    catch (err) {
      setApiError(err.message);
      setLoading(false);
      console.error("Error by getWeatherByCurrentLocation(): ", + err.message);
    }
  }

  // 도시명을 기반으로 날씨 객체 받아오기
  const getWeatherByCity = async() => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
      setLoading(true);
      let response = await fetch(url);
      let data = await response.json();
      setWeather(data);
      setLoading(false);
    }
    catch (err) {
      setApiError(err.message);
      setLoading(false);
      console.error("Error by getWeatherByCity(): ", + err.message);
    }
  }
  
  const handleCityChange = (city) => {
    setReloading(prev => !prev);
    if (city === "current") {
      setCity(null);
    } else {
      setCity(city);
    }
  }

  useEffect(() => {
    if (city == null) {
      getCurrentLocation();
    } else {
      getWeatherByCity();
    }
  }, [city, reloading]);

  return (
    <div>
      {loading ? (
        <div className="whole">
          <ClipLoader color="#fff" loading={loading} size={100} />
        </div>
      ) : !apiError ? (
        <div className="whole">
          <div className="container">
            <button className="reset-btn" onClick={() => handleCityChange("current")}>
              <img src={resetImg} className="reset-img" alt="Refresh Game"/>
            </button>
            <div className='wrapper'>
              <div className="wrapper-left">
                <WeatherBox weather={weather}/>
              </div>
              <div className="wrapper-right">
                <Details weather={weather}/>
                <Locations
                  cities={cities}
                  selectedCity={city}
                  handleCityChange={handleCityChange}
                />
              </div>
            </div>
            <footer>© seongyurim, July 2024</footer>
          </div>
        </div>
      ) : (
        <div className="error-message">{apiError}</div>
      )}
    </div>
  );
}

export default App;
