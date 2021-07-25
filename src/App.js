import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import WeatherWeek from "./WeatherWeek";
import WeatherInput from "./weatherInput";
import { getTemperature, resetMap } from "./utils"; 
import "./App.css";

const light = {
  color: "#888C91",
};

const cacheData = {};
let cacheTimer = 0;

function App() {
  const [weatherData, setWeatherData] = useState({});
  const [nextWeatherData, setNextWeatherData] = useState({});
  const [city, setCity] = useState("");
  const [flag, setFlag] = useState(false);
  const [temp, setTemp] = useState(0);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    const date = new Date().toString().split(" ");
    setDate(date[0] + ", " + date.slice(1, 4).join("-"));
    setTime(date[4]);
    weatherData.main &&
      setTemp((parseFloat(weatherData.main.temp) - 273.15).toFixed(2));
  }, [weatherData.main]);

  // API Caching
  const getCacheTimer = (time) => {
    const now = new Date().getTime();
    if (cacheTimer < now + time) {
      cacheTimer = now + time;
    }
    return cacheTimer;
  };

  // API Caching
  const fetchCacheData = async (cityName, timer) => {
    resetMap();
    const now = new Date().getTime();
    if (!cacheData[cityName] || cacheData[cityName].cacheTimer < now) {
      const data = await getTemperature(cityName);
      cacheData[cityName] = data;
      cacheData[cityName].cacheTimer = getCacheTimer(timer);
    }
    setWeatherData(cacheData[cityName].weatherData);
    setNextWeatherData(cacheData[cityName].nextWeatherData);
  };

  const convert = (tempData) => (parseFloat(tempData) - 273.15).toFixed(2);

  const convertToCelius = () => setTemp((((temp - 32) * 5) / 9).toFixed(2));

  const convertToFahrenheit = () => setTemp(((temp * 9) / 5 + 32).toFixed(2));

  return (
    <Container fluid>
      <WeatherInput
        city={city}
        setCity={setCity}
        fetchCacheData={fetchCacheData}
        setWeatherData={setWeatherData}
        setFlag={setFlag}
      />
      {Object.keys(weatherData).length > 0 && (
        <Row>
          <Col md={{ span: 8, offset: 2 }}>
            <Card className="card">
              <Row style={{ marginBottom: "10px" }}>
                <Col md={1}>
                  <img
                    src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                    alt="weather icon"
                    className="weatherIcon"
                  />
                </Col>
                <Col md={{ span: 4 }}>
                  <h3 style={{ display: "inline-block" }}>
                    {temp}
                    <span
                      style={flag ? light : null}
                      onClick={(e) => {
                        if (!flag) {
                          e.stopPropagation();
                        } else {
                          setFlag(!flag);
                          convertToCelius();
                        }
                      }}
                    >
                      {" "}
                      °C{" "}
                    </span>
                    |
                    <span
                      style={flag ? null : light}
                      onClick={(e) => {
                        if (flag) {
                          e.stopPropagation();
                        } else {
                          setFlag(!flag);
                          convertToFahrenheit();
                        }
                      }}
                    >
                      {" "}
                      °F
                    </span>
                  </h3>
                  <br />
                  <h6>{date}</h6>
                  <h6>{time}</h6>
                </Col>
                <Col>
                  <h5 style={{ color: "#888C91" }}>
                    {"Feels Like  -  " +
                      convert(weatherData.main.feels_like) +
                      " °C"}
                    <br />
                    {"Min Temp  -  " +
                      convert(weatherData.main.temp_min) +
                      " °C"}
                    <br />
                    {"Max Temp  -  " +
                      convert(weatherData.main.temp_max) +
                      " °C"}
                    <br />
                    {"Pressure  -  " + weatherData.main.pressure + " hPa"}
                    <br />
                    {"Humidity  -  " + weatherData.main.humidity + " %"}
                  </h5>
                </Col>
                <Col>
                  <h3 className="cityName">
                    {weatherData.name}
                    <br />
                    <span style={{ color: "#70757A" }}>
                      {weatherData.weather[0].main}
                    </span>
                  </h3>
                </Col>
              </Row>
              <WeatherWeek tempList={nextWeatherData.list} />
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default App;
