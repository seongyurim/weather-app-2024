import React from 'react';

const WeatherBox = ({weather}) => {
  // 매개변수로 props를 쓰면 값을 가져다 쓸 때마다 props.weather.@@를 써야 해서 번거로워진다.
  // 이를 개선하는 방법으로 디스트럭처링을 사용할 수 있다. {weather}이 그것이다.
  // 이렇게 작성하면 매개변수 객체에서 필요한 것만 간단하게 꺼내어 쓸 수 있게 된다.
  // {weather} = props에 있는 weather를 가져 올게요!
  // 콘솔로 테스트해보자.
  console.log("Weather?!", weather);

  // 날씨 description의 첫단어만 대문자로 변경
  function capitalizeWords(str) {
    if (!str) return "";
    return str.replace(/\b\w/g, char => char.toUpperCase());
  }

  return (
    <div className="weatherBox-container">
      <div className="top-box">
        <div className="title">WeatherNow</div>
        <div className="subtitle">Check out the weather in <strong>{weather?.name}</strong> today.</div>
        <span className="main-temp">
          <span className="main-temp-num">{Math.floor(weather?.main.temp)}</span>
          <div className="main-temp-unit">°</div>
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
  )
}

export default WeatherBox
