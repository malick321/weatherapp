import React, { useState } from "react";

const New = ({
  city,
  setcity,
  country,
  setcountry,
  weatherData,
  handleSubmit,
  loading,
  
}) => {
  const [unit, setUnit] = useState("Celsius");

  const handleChange = (e) => {
    setUnit(e.target.value);
  };

  

  return (
    <div>
      <h1 style={{ textAlign: "center", color: "purple" }}>Weather App</h1>
      <form onSubmit={handleSubmit} style={{ textAlign: "center" }}>
        <label htmlFor="enter city ">CityName</label>
        <input
        style={{marginLeft:"3px",borderRadius:"5px"}}
          type="text"
          value={city}
          onChange={(e) => setcity(e.target.value)}
        />
        <label htmlFor="enter city ">Countryname</label>
        <input
        style={{marginLeft:"3px",borderRadius:"5px"}}
          type="text"
          value={country}
          onChange={(e) => setcountry(e.target.value)}
        />
        <br></br>
        <button style={{marginTop:"10px" ,borderRadius:"3px"}}>Submit</button>
      </form>

      <div style={{ textAlign: "center" }}>
        <select value={unit} onChange={handleChange} style={{marginTop:"10px" ,hborderRadius:"3px"}}>
          <option value="Celsius">Celsius</option>
          <option value="Fahrenheit">Fahrenheit</option>
        </select>
      </div>

      {loading ? (
        <p style={{ textAlign: "center" }}>Loading...</p>
      ) : (
        <div>
          <h1 style={{ textAlign: "center", color: "purple" }}>
            Current weather in {weatherData.city_name}
          </h1>
          <p style={{ textAlign: "center" }}>
            Temperature:{" "}
            {unit === "Celsius"
              ? `${weatherData.data && weatherData.data[0] && weatherData.data[0].temp} °C`
              : `${(weatherData.data && weatherData.data[0] && weatherData.data[0].temp * 1.8 + 32).toFixed(1)} °F`}
          </p>
          <p style={{ textAlign: "center" }}>
            Humidity:{" "}
            {weatherData.data && weatherData.data[0] && weatherData.data[0].rh}
          </p>
          <p style={{ textAlign: "center" }}>
            Wind Speed:{" "}
            {weatherData.data &&
              weatherData.data[0] &&
              weatherData.data[0].wind_spd}
          </p>

          <p style={{ textAlign: "center" }}>
            Description:{" "}
            {weatherData.weather &&
              weatherData.data[0] &&
              weatherData.data[0].description}
          </p>
        </div>
      )}
    </div>
  );
};

export default New;
