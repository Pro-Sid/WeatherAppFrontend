import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import LineChart from "react-linechart";
import WeatherDay from "./WeatherDay";
import { setColor, getColor } from "./utils";

const WeatherWeek = ({ tempList }) => {
  const [chartData, setChartData] = useState({});
  const [dayTemp, setDayTemp] = useState("");
  const findPoints = (tempData, index) => {
    setColor(index);
    setDayTemp(tempData);
    const points = [];
    tempData.forEach((t, i) => {
      points.push({
        x: i + 1,
        y: (parseFloat(t.main.temp) - 273.15).toFixed(2),
      });
    });
    const data = [
      {
        color: "#FFCC00",
        points: points,
      },
    ];
    setChartData(data);
  };

  return (
    <>
      {tempList && tempList.length > 0 && (
        <>
          {Object.keys(chartData).length > 0 && (
            <div style={{ marginLeft: "-35px" }}>
              <LineChart
                data={chartData}
                width={850}
                height={200}
                hideXLabel={true}
                hideYLabel={true}
                hideXAxis={true}
                hideYAxis={true}
              />
            </div>
          )}
          <WeatherDay tempData={dayTemp}/>
          <Row>
            {tempList.map((temp, index) => {
              if ([0, 7, 15, 23, 31, 39, 47].includes(index)) {
                return (
                  <Col
                    onClick={() => findPoints(tempList.slice(index, index + 6), index)}
                    key={temp.dt_txt}
                    style={{ backgroundColor: getColor(index) }}
                  >
                    <div
                      style={{ marginLeft: "20.8px", marginBottom: "19.2px" }}
                    >
                      {new Date(temp.dt_txt).toString().slice(0, 4)}
                    </div>
                    <img
                      src={`http://openweathermap.org/img/wn/${temp.weather[0].icon}@2x.png`}
                      alt="weather icon"
                      style={{ marginTop: "-35px", marginLeft: "-25px" }}
                      width={120}
                      height={120}
                    />
                    <div style={{ marginLeft: "16px" }}>
                      {(parseFloat(temp.main.temp) - 273.15).toFixed(2) + "°"}
                    </div>
                  </Col>
                );
              }
              return null;
            })}
          </Row>
        </>
      )}
    </>
  );
};

export default WeatherWeek;
