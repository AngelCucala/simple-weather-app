import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import styles from '../styles/Contact.module.scss';

interface FormData {
  name: string;
  birthDate: string;
  city: string;
  email: string;
  phone: string;
}

function Contact() {
  const { t } = useTranslation();

  const [formData, setFormData] = useState<FormData>({
    name: '',
    birthDate: '',
    city: '',
    email: '',
    phone: '',
  });

  const [notification, setNotification] = useState<string>('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    if (Object.values(formData).some(field => field === '')) {
      setNotification(t('all_fields_required'));
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setNotification(t('invalid_email_format'));
      return;
    }

    const phoneRegex = /^\d+$/;
    if (!phoneRegex.test(formData.phone)) {
      setNotification(t('invalid_phone_format'));
      return;
    }

    setNotification(t('form_success'));
    console.log('Formulario enviado:', formData);
  };

  return (
    <div className={styles.contact}>
      <h2>{t('contact_form')}</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="name">{t('name')}</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
  
        <div className={styles.formGroup}>
          <label htmlFor="birthDate">{t('birth_date')}</label>
          <input
            type="date"
            id="birthDate"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
            required
          />
        </div>
  
        <div className={styles.formGroup}>
          <label htmlFor="city">{t('city')}</label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </div>
  
        <div className={styles.formGroup}>
          <label htmlFor="email">{t('email')}</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
  
        <div className={styles.formGroup}>
          <label htmlFor="phone">{t('phone')}</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
  
        <div className={styles.buttonContainer}>
          <button type="submit">{t('submit')}</button>
        </div>
      </form>
  
      {notification && <div className={styles.notification}>{notification}</div>}
    </div>
  );
  
}

export default Contact;
