import React from 'react'

const WeatherBox = ({weather}) => {
    // 매개변수로 props를 쓰면 값을 가져다 쓸 때마다 props.weather.@@를 써야 해서 번거로워진다.
    // 이를 개선하는 방법으로 디스트럭처링을 사용할 수 있다. {weather}이 그것이다.
    // 이렇게 작성하면 매개변수 객체에서 필요한 것만 간단하게 꺼내어 쓸 수 있게 된다.
    // {weather} = props에 있는 weather를 가져 올게요!
    // 콘솔로 테스트해보자.
    console.log("Weather?!", weather);

  return (
    <div className="weather-box">
      <div>{weather?.name}</div> 
      {/* 삼항연산자가 논리곱 연산자와 같은 역할을 수행하고 있다. */}

      <h2>{Math.floor(weather?.main.temp)}℃ / {Math.floor(weather?.main.temp * 1.8 + 32)}℉</h2>
      <div>{weather?.weather[0].description}</div>
    </div>
  )
}

export default WeatherBox
