import axios from 'axios';

export const sendSearchQuery = async (query: string) => {
  const apiKey = '1b91a54273c0490e988a58744e5cf504';
  const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${query}&key=${apiKey}`;

  try {
    const response = await axios.get(apiUrl);
    const { results } = response.data;

    if (results.length > 0) {
      const {
        geometry: { lat, lng },
      } = results[0];


      const weatherData = await weatherApiCall(lat, lng);

      return { lat, lng, weatherData };
    } else {
      console.log('No results found.');
      return { lat: null, lng: null, weatherData: null };
    }
  } catch (error) {
    console.error('Error fetching data from OpenCage API:', error);
    return { lat: null, lng: null, weatherData: null }; 
  }
};


const weatherApiCall = async (lat: number, lng: number) => {
  console.log(`--- WEATHER API CALL ---`);
  console.log(`Latitude: ${lat}`);
  console.log(`Longitude: ${lng}`);
  console.log(`------------------------`);

  const apiKey = 'cdefe541d14ceba8731fdd40a4f89cde';
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&appid=${apiKey}&units=metric`;

  try {
    const response = await axios.get(apiUrl);
    const data = response.data;

    console.log('Weather Data:', data);

    const cityName = data.city?.name || 'Unknown City';
    console.log(`City: ${cityName}`);

    if (data.list && data.list.length > 0) {
      const firstPrediction = data.list[0];
      const {
        weather: [{ main, description }],
      } = firstPrediction;

    } else {
      console.log('No weather data available.');
    }

    return data;
  } catch (error) {
    console.error('Error fetching data from Weather API:', error);
    return null; 
  }
};
