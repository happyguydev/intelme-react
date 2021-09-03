import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import FieldContainer from '../../components/fieldContainer';
import FormField from '../../components/formField';
import ReCAPTCHAContainer from '../../components/recaptchaContainer';

import LoginImage from '../../assets/images/activation-illustration.svg';
import './styles.scss';

const ForgotPassword = () => {
  const [fields, setFields] = useState({
    tenant: '',
    username: '',
    password: '',
  });
  const [captchaIsOkay, setCaptchaIsOkay] = useState(false);

  const formInputsAreValid = Boolean(
    !fields.username || !fields.tenant || !fields.password || !captchaIsOkay
  );

  const onChange = (e) => {
    const inputName = e.target.name;
    const value = e.target.value;
    setFields((previous) => {
      return {
        ...previous,
        [inputName]: value,
      };
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <div className="forgotPassword">
      <div className="image-wrapper">
        <img src={LoginImage} alt="Forgot Password" />
      </div>
      <div className="form-container">
        <h1>Forgot Password</h1>
        <p className="description">
          Please enter your username and we’ll send you instructions on how to
          reset your password.
        </p>
        <form onSubmit={onSubmit}>
          <FieldContainer>
            <FormField
              label="Company ID"
              placeholder="Company ID"
              name="tenant"
              onChange={(e) => onChange(e)}
            />
          </FieldContainer>
          <FieldContainer>
            <FormField
              label="Username"
              placeholder="Username"
              name="username"
              onChange={(e) => onChange(e)}
            />
          </FieldContainer>

          <FieldContainer>
            <FormField
              label="Password"
              type="password"
              name="password"
              placeholder="••••••••"
              onChange={(e) => onChange(e)}
            />
          </FieldContainer>
          {/* <ReCAPTCHAContainer handleChange={() => setCaptchaIsOkay(true)} /> */}
          <Button
            className="sendEmailButton"
            disabled={formInputsAreValid}
            type="submit"
          >
            Send EMAIL
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
