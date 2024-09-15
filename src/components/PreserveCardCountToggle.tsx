// src/components/PreserveCardCountToggle.tsx
import React from 'react';
import styles from '../styles/PreserveCardCountToggle.module.scss'; 
import { useTranslation } from 'react-i18next';
import '../i18n';

interface PreserveCardCountToggleProps {
  preserve: boolean;
  onChange: (checked: boolean) => void;
}

const PreserveCardCountToggle: React.FC<PreserveCardCountToggleProps> = ({ preserve, onChange }) => {
  const { t } = useTranslation();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked);
  };

  return (
    <div className={styles.toggleContainer}>
      <label>
        <input
          type="checkbox"
          checked={preserve}
          onChange={handleChange}
        />
        {preserve ? t('preserve_card_count') : t('load_3_cards')}
      </label>
    </div>
  );
};

export default PreserveCardCountToggle;
