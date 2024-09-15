// src/components/Sidebar.tsx
import React from 'react';
import styles from '../styles/Sidebar.module.scss';
import Contact from './Contact';
import PreserveCardCountToggle from './PreserveCardCountToggle';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  onTogglePreserve: (checked: boolean) => void; 
  preserveCardCount: boolean; 
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar, onTogglePreserve, preserveCardCount }) => {
  return (
    <div className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
      <div className={styles.sidebarHeader}>
        <h2>Menu</h2>
        <button className={styles.closeButton} onClick={toggleSidebar}>
          &times;
        </button>
      </div>
      <ul className={styles.menuItems}>
        <Contact />
        <PreserveCardCountToggle 
          preserve={preserveCardCount}
          onChange={onTogglePreserve}
        />
      </ul>
    </div>
  );
};

export default Sidebar;
