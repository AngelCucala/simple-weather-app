// src/context/WeatherContext.tsx
import React, { createContext, useState, ReactNode } from 'react';

interface WeatherContextType {
  weatherData: any; 
  setWeatherData: (data: any) => void;
}

export const WeatherContext = createContext<WeatherContextType>({
  weatherData: null,
  setWeatherData: () => {},
});

export const WeatherProvider = ({ children }: { children: ReactNode }) => {
  const [weatherData, setWeatherData] = useState<any>(null);

  return (
    <WeatherContext.Provider value={{ weatherData, setWeatherData }}>
      {children}
    </WeatherContext.Provider>
  );
};
