import { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import WeatherBox from './component/WeatherBox';
import WeatherButton from './component/WeatherButton';
import ClipLoader from "react-spinners/ClipLoader";

function App() {

  const [weather, setWeather] = useState(null);
  const cities = ['Dublin', 'Edinburgh', 'London', 'Paris'];
  // 도시 정보를 굳이 배열로 만들어 넘기는 이유?
  // 지금은 도시가 4개지만 나중에 사이트가 커져 도시를 3천개를 표시해야 한다면 어떨까.
  // 1) WeatherButton에 HTML 코드 작업량이 너무 많아진다.
  // 2) 그에 따라 스펠 미스가 발생할 우려도 있다.
  // 따라서 앞으로 많이 쓰일 정보들을 이렇게 배열로 미리 모아두는 것이다.
  // 배열에 저장해 둔 요소만큼의 버튼을 생성할 수 있게 된다.

  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);

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
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=7d14207953b97208eecfcca8a8f46279&units=metric`;
    setLoading(true); // API 데이터 fetch 전이므로 로딩스피너 보여주기
    let response = await fetch(url);
    let data = await response.json();
    setWeather(data); // 받아온 날씨 정보를 weather 상태변수에 담기
    setLoading(false); // 데이터 fetch가 완료되었으므로 로딩스피너 가리기
  }

  // 도시명을 기반으로 날씨 객체 받아오기
  const getWeatherByCity = async() => {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=7d14207953b97208eecfcca8a8f46279&units=metric`;
    setLoading(true);
    let response = await fetch(url);
    let data = await response.json();
    setWeather(data);
    setLoading(false);
  }

  useEffect(() => {
    if (city == "") {
      getCurrentLocation();
    } else {
      getWeatherByCity();
    }
  }, [city]);

  return (
    <div>
      {loading ? (
        <div className="container">
          <ClipLoader color="#fff" loading={loading} size={100} />
        </div>
      ): (
        <div className="container">
          <WeatherBox weather={weather}/>
          <WeatherButton cities={cities} setCity={setCity}/>
        </div>
      )}
    </div>
  );
}

export default App;
