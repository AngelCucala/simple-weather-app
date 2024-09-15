// src/components/Header.tsx
import { useTranslation } from 'react-i18next'; 
import styles from '../styles/Header.module.scss';
import flagEs from '../assets/espIcon.svg';
import flagEn from '../assets/ingIcon.svg';

function Header() {
  const { i18n, t } = useTranslation();
  const currentLanguage = i18n.language; 

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <header className={styles.header}>
      
      <div className={styles.header__title}>{t('app_title')}</div>
      <div className={styles.header__flags}>
        <img
          src={flagEn}
          alt="English"
          onClick={() => changeLanguage('en')}
          className={currentLanguage === 'en' ? styles.selected : ''}
        />
        <img
          src={flagEs}
          alt="Español"
          onClick={() => changeLanguage('es')}
          className={currentLanguage === 'es' ? styles.selected : ''}
        />
      </div>
    </header>
  );
}

export default Header;
