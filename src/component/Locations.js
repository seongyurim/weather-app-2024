import React from 'react';

const Locations = ({cities, selectedCity, handleCityChange}) => {
  console.log("Cities? ", cities);

  return (
    <div>
      <div className="right-titles second">Locations</div>
      <button
        className={`locations-box ${selectedCity == null ? "outline-light" : "light"}`}
        onClick={() => handleCityChange("current")}>
        Current City
      </button>

      {cities.map((item) => (
        <div>
          <button
            className={`locations-box ${selectedCity == item ? "outline-light" : "light"}`}
            onClick={() => handleCityChange(item)}>
            {item}
          </button>
        </div>
      ))}
    </div>
  );
};

export default Locations;