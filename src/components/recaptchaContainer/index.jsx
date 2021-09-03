import React from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

import recaptchaContainerStyles from './styles';

const ReCAPTCHAContainer = ({ handleChange }) => {
  const styles = recaptchaContainerStyles();

  return (
    <div className={styles.container}>
      <ReCAPTCHA
        size="normal"
        onChange={handleChange}
        sitekey={process.env.REACT_APP_GOOGLE_RECAPTCHA_API_KEY}
      />
    </div>
  );
};

export default ReCAPTCHAContainer;
