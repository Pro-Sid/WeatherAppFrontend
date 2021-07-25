import React from "react";
import { Row, Col } from "react-bootstrap";

const WeatherDay = ({ tempData }) => {
  const findTime = (date) => {
    const dateTime = date.split(" ");
    let time = "";
    if (dateTime[1].charAt(0) === "0") time = parseInt(dateTime[1].charAt(1));
    else time = parseInt(dateTime[1].substr(0, 2));
    if (time < 12)
      return time === 0 ? time + 12 + "am" : time + "am";
    if (time === 12) return time + "pm";
    return time - 12 + "pm";
  };
  return (
    <Row md={12} style={{ backgroundColor: "#e6e6ff" }}>
      {tempData.length > 0 &&
        tempData.map((t) => {
          return (
            <Col style={{ marginLeft: "15.2px" }}>
              {(parseFloat(t.main.temp) - 273.15).toFixed(2) + "°"}
              <br />
              {"(" + findTime(t.dt_txt) + ")"}
            </Col>
          );
        })}
    </Row>
  );
};

export default WeatherDay;
