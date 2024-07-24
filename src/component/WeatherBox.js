import React from 'react';

const WeatherBox = ({weather}) => {

  // 날씨 description의 첫 문자만 대문자로 변경
  function capitalizeWords(str) {
    if (!str) return "";
    return str.replace(/\b\w/g, char => char.toUpperCase());
  }

  return (
    <div className="weatherBox-container">
      <div className="top-box">
        <div className="title">WeatherNow</div>
        <div className="subtitle">Check out the weather in {weather?.name} today.</div>
        <span className="main-temp">
          <span className="main-temp-num">{Math.floor(weather?.main.temp)}
            <div className="main-temp-unit">°</div>
          </span>
        </span>
      </div>
      <div className="bottom-box">
        <div className="name-and-desc">
          <div className="city-name">{weather?.name}</div> 
          <div>{capitalizeWords(weather?.weather[0].description)}</div>
        </div>
        <img
          src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`}
          alt="Weather Icon"
        />
      </div>
    </div>
  );
};

export default WeatherBox;
