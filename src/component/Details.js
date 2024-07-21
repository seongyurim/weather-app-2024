import React from 'react';

const Details = ({weather}) => {
  return (
    <div>
      <div className="right-titles">Details</div>
      <div className="details-box">
        <div className="details-title">Feels Like</div>
        <div className="details-value">{Math.floor(weather?.main.feels_like)}°</div>
      </div>
      <div className="details-box">
        <div className="details-title">Max Temp</div>
        <div className="details-value">{Math.floor(weather?.main.temp_max)}°</div>
      </div>
      <div className="details-box">
        <div className="details-title">Min Temp</div>
        <div className="details-value">{Math.floor(weather?.main.temp_min)}°</div>
      </div>
      <div className="details-box">
        <div className="details-title">Humidity</div>
        <div className="details-value">{Math.floor(weather?.main.humidity)}%</div>
      </div>
      <div className="details-box">
        <div className="details-title">Wind</div>
        <div className="details-value">{weather?.wind.speed}m/s</div>
      </div>
    </div>
  )
}

export default Details;
