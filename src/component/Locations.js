import React from 'react';

const Locations = ({cities, selectedCity, handleCityChange}) => {
  console.log("Cities? ", cities);

  return (
    <div>
      <div className="right-titles second">Locations</div>
      <div className="locations-box">
        <button
          className={`locations-name ${selectedCity == null ? "active-txt" : ""}`}
          onClick={() => handleCityChange("current")}>
          Current City
        </button>
        <div className={`${selectedCity == null ? "active-btn" : "default-btn"}`}></div>
      </div>

      {cities.map((item) => (
        <div className="locations-box">
          <button
            className={`locations-name ${selectedCity == item ? "active-txt" : ""}`}
            onClick={() => handleCityChange(item)}>
            {item}
          </button>
          <div className={`${selectedCity == item ? "active-btn" : "default-btn"}`}></div>
        </div>
      ))}
    </div>
  );
};

export default Locations;