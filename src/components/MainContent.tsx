// src/components/MainContent.tsx
import React, { useState, useEffect, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { WeatherContext } from '../context/WeatherContext';
import styles from '../styles/MainContent.module.scss';
import { getUserLocation } from '../utils/getUserLocation'; 
import axios from 'axios';
import '../i18n';

interface MainContentProps {
  preserveCardCount: boolean;
}

const MainContent: React.FC<MainContentProps> = ({ preserveCardCount }) => {
  const { i18n, t } = useTranslation();
  const { weatherData, setWeatherData } = useContext(WeatherContext);
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    const fetchWeatherByLocation = async () => {
      try {
        console.log('Attempting to get user location...');
        const position = await getUserLocation();
        if (position) {
          const { latitude, longitude } = position.coords;
        
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=cdefe541d14ceba8731fdd40a4f89cde&units=metric`
          );
 
          setWeatherData({
            lat: latitude,
            lon: longitude,
            weatherData: response.data
          });
        } else {
          console.log('Position is null.');
        }
      } catch (error) {
        console.error('Failed to fetch weather data based on location:', error);
      }
    };
    fetchWeatherByLocation();
  }, [setWeatherData]);

  useEffect(() => {
    if (!preserveCardCount) {
      setVisibleCount(3);
    }
  }, [weatherData, preserveCardCount]);

  if (!weatherData || !weatherData.weatherData || !weatherData.weatherData.list || weatherData.weatherData.list.length === 0) {
    return (
      <div className={styles.loading}>
        <div className={styles.ball}></div>
        <p>{t('location_not_loaded_message')}</p>
      </div>
    );
  }
  const predictions = weatherData.weatherData.list.slice(0, visibleCount);
  const cityName = weatherData.weatherData.city?.name || t('unknown_city');

  const handleLoadMore = () => {
    setVisibleCount(visibleCount + 3);
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      hour: '2-digit',
      minute: '2-digit',
    };
    return date.toLocaleDateString(i18n.language, options);
  };

  const formatWindDirection = (degrees: number) => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round(degrees / 45) % 8;
    return directions[index];
  };

  return (
    <div className={styles.mainContent}>
      <h2>{cityName}</h2>
      <div className={styles.cardsContainer}>
        {predictions.map((prediction, index) => {
          const { main, description, icon } = prediction.weather[0];
          const { temp, feels_like, temp_min, temp_max } = prediction.main;
          const { speed, deg } = prediction.wind;
          const formattedTime = formatTime(prediction.dt_txt);
          const windDirection = formatWindDirection(deg);

          return (
            <div key={index} className={styles.card}>
              <div className={styles.timeWithIcon}>
                <img
                  src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
                  alt={description}
                  className={styles.weatherIcon}
                />
                <span className={styles.timeText}>{formattedTime}</span>
              </div>
              <p>{t('weather_description')}: {t(description)}</p>
              <p>{t('temperature')}: {temp}°C</p>
              <p>{t('feels_like')}: {feels_like}°C</p>
              <p>{t('temp_min')}: {temp_min}°C</p>
              <p>{t('temp_max')}: {temp_max}°C</p>
              <p>{t('wind_speed')}: {speed} m/s</p>
              <p>{t('wind_direction')}: {windDirection}</p>
            </div>
          );
        })}
      </div>
      {visibleCount < weatherData.weatherData.list.length && (
        <button className={styles.loadMoreButton} onClick={handleLoadMore}>
          {t('load_more')}
        </button>
      )}
    </div>
  );
};

export default MainContent;
