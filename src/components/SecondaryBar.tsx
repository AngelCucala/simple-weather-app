// src/components/SecondaryBar.tsx
import React, { useState, useContext } from 'react';
import styles from '../styles/SecondaryBar.module.scss';
import searchIcon from '../assets/searchIcon.svg';
import { useTranslation } from 'react-i18next';
import { sendSearchQuery } from '../utils/SearchHandler';
import { WeatherContext } from '../context/WeatherContext';

interface SecondaryBarProps {
  toggleSidebar: () => void;
}

function SecondaryBar({ toggleSidebar }: SecondaryBarProps) {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const { setWeatherData } = useContext(WeatherContext);

  const handleSearch = async () => {
    if (searchQuery.trim() !== '') {
      const weatherData = await sendSearchQuery(searchQuery);
      if (weatherData) {
        setWeatherData(weatherData); 
      } else {
        console.error('Error: No weather data returned');
      }
      setSearchQuery('');
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className={styles.secondaryBar}>
      <button className={styles.menuButton} onClick={toggleSidebar}>☰</button>
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder={t('search_city')}
          className={styles.searchInput}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <img
          src={searchIcon}
          alt="Search"
          className={styles.searchIcon}
          onClick={handleSearch}
        />
      </div>
    </div>
  );
}

export default SecondaryBar;
