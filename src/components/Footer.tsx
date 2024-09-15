// src/components/Footer.tsx
import styles from '../styles/Footer.module.scss';
import { useTranslation } from 'react-i18next';

function Footer(){
  const { t } = useTranslation();

  return (
    <footer className={styles.footer}>
      <p>{t('legal_advice')}</p>
    </footer>
  );
}

export default Footer;
