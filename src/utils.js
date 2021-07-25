const map = new Map();

export const resetMap = () => {
  map.set(0, "white");
  map.set(7, "white");
  map.set(15, "white");
  map.set(23, "white");
  map.set(31, "white");
  map.set(39, "white");
};

export const setColor = (index) => {
  resetMap();
  map.set(index, "#e6e6ff");
};

export const getColor = (index) => map.get(index);

// API Call to get weather data
export const getTemperature = async (city) => {
  const proxyUrl = "http://localhost:5000/";
  const apiData = {};
  const url = `${proxyUrl}day?`;
  const nextDayUrl = `${proxyUrl}nextDay?`;

  try {
    await fetch(
      url +
        new URLSearchParams({
          city: city,
        })
    )
      .then((res) => res.json())
      .then((response) => (apiData.weatherData = response));
    await fetch(
      nextDayUrl +
        new URLSearchParams({
          city: city,
        })
    )
      .then((res) => res.json())
      .then((response) => (apiData.nextWeatherData = response));
  } catch (error) {
    console.log(error);
  }
  return apiData;
};
