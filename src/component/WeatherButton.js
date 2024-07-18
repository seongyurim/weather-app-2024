import React from 'react';
import { Button } from 'react-bootstrap';

const WeatherButton = ({cities, setCity}) => {
    console.log("Cities? ", cities);

  return (
    <div>
      <Button variant="primary">
        Current City
      </Button>

      {cities.map((item, idx) => (
        <Button variant="info" key={idx} onClick={() => setCity(item)}>
          {item}
        </Button>
      ))}
    </div>
  );
};

export default WeatherButton;