import React from "react";
import { Row, Col, FormGroup } from "react-bootstrap";
import "./App.css";

const WeatherInput = ({
  city,
  setCity,
  fetchCacheData,
  setWeatherData,
  setFlag,
}) => {
  return (
    <Row style={{ marginTop: "16px" }}>
      <Col md={{ span: 4, offset: 2 }}>
        <h2 style={{ color: "white" }}>Enter city to find weather</h2>
      </Col>
      <Col md={{ span: 4 }}>
        <FormGroup>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") fetchCacheData(city, 10000);
            }}
            onFocus={() => {
              setWeatherData({});
              setFlag(false);
              setCity("");
            }}
            className="form-control"
          />
          <i
            className="fa fa-search"
            onClick={() => fetchCacheData(city, 10000)}
            style={{ marginTop: "-28px", marginLeft: "394px" }}
          ></i>
        </FormGroup>
      </Col>
    </Row>
  );
};

export default WeatherInput;
