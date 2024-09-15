// src/App.tsx
import React, { useState } from 'react';
import Header from './components/Header';
import SecondaryBar from './components/SecondaryBar';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import './styles/main.scss';
import { WeatherProvider } from './context/WeatherContext';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [preserveCardCount, setPreserveCardCount] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleTogglePreserve = (checked: boolean) => {
    setPreserveCardCount(checked);
  };

  return (
    <div className='container'>
      <WeatherProvider>
        <Header />
        <SecondaryBar toggleSidebar={toggleSidebar} />
        <Sidebar 
          isOpen={isSidebarOpen} 
          toggleSidebar={toggleSidebar} 
          onTogglePreserve={handleTogglePreserve}
          preserveCardCount={preserveCardCount} 
        />
        <MainContent preserveCardCount={preserveCardCount} /> {/* Pasa el estado al MainContent */}
        <Footer />
      </WeatherProvider>
    </div>
  );
}

export default App;
