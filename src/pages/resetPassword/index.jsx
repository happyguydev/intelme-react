import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import FieldContainer from '../../components/fieldContainer';
import FormField from '../../components/formField';

import './styles.scss';

const ForgotPassword = () => {
  const [redirect, setRedirect] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [passwordValidations, setPasswordValidations] = useState({
    atLeast8CharLong: false,
    oneLowerCaseLetter: false,
    oneUpperCaseLetter: false,
    oneNumberSymbolSpecialChar: false,
  });
  const [errors, setErrors] = useState({
    passwordIncorrect: false,
    passwordDoesNotMeetRequirement: false,
    passwordDoesNotMatch: false,
  });

  const validatePassword = Boolean(!passwordValidations);

  const onChange = (e) => {
    if (e.target.name === 'newPassword') {
      setNewPassword(e.target.value);
      setErrors({ ...errors, passwordIncorrect: false });
    } else {
      setConfirmPassword(e.target.value);
    }
  };

  const handleNewPasswordChange = (v) => {
    const password = v.target.value;

    setNewPassword(password);

    if (password.length >= 8) {
      setPasswordValidations((validations) => ({
        ...validations,
        atLeast8CharLong: true,
      }));
    } else {
      setPasswordValidations((validations) => ({
        ...validations,
        atLeast8CharLong: false,
      }));
    }

    // checks for lower case in password
    if (password.match(/[a-z]/)) {
      setPasswordValidations((passwordValidations) => ({
        ...passwordValidations,
        oneLowerCaseLetter: true,
      }));
    } else {
      setPasswordValidations((passwordValidations) => ({
        ...passwordValidations,
        oneLowerCaseLetter: false,
      }));
    }

    // checks for upper case in password
    if (password.match(/[A-Z]/)) {
      setPasswordValidations((passwordValidations) => ({
        ...passwordValidations,
        oneUpperCaseLetter: true,
      }));
    } else {
      setPasswordValidations((passwordValidations) => ({
        ...passwordValidations,
        oneUpperCaseLetter: false,
      }));
    }

    // check for number, symbol or special character
    if (
      /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/.test(password) ||
      /\d/.test(password)
    ) {
      setPasswordValidations((passwordValidations) => ({
        ...passwordValidations,
        oneNumberSymbolSpecialChar: true,
      }));
    } else {
      setPasswordValidations((passwordValidations) => ({
        ...passwordValidations,
        oneNumberSymbolSpecialChar: false,
      }));
    }
  };

  const handleConfirmPasswordChange = (v) => {
    const password = v.target.value;

    if (password !== newPassword && password.length > 0) {
      setErrors((error) => ({ ...error, passwordDoesNotMatch: true }));
    } else {
      setErrors((error) => ({ ...error, passwordDoesNotMatch: false }));
    }

    setConfirmPassword(password);
  };

  const onSubmit = async () => {};

  return (
    <div className="forgotPassword-wrapper">
      {redirect && <Redirect to={redirect} />}
      <div className="image-wrapper">
        <img src="/activation-illustration.svg" alt="Forgot Illustration" />
      </div>

      <div className="form-container">
        <h1>Set a new password</h1>
        <form action="">
          <FieldContainer>
            <FormField
              label="New Password"
              type="password"
              name="newPassword"
              placeholder="••••••••"
              onChange={(e) => onChange(e)}
            />
          </FieldContainer>

          <FieldContainer>
            <FormField
              label="Confirm new Password"
              type="password"
              name="confirmPassword"
              placeholder="••••••••"
              onChange={(e) => onChange(e)}
            />
          </FieldContainer>
          <Button type="submit">Set new Password</Button>
        </form>
        <div className="password-requirements">
          <p>Password Requirements</p>
          <div className="requirements-info-wrapper">
            <span>
              <img src="/CheckError.svg" alt="Check" /> At least 8 characters
              long
            </span>

            <span>
              <img src="/CheckError.svg" alt="Check" /> One lowercase letter
            </span>

            <span>
              <img src="/CheckError.svg" alt="Check" />
              One uppercase letter
            </span>

            <span>
              <img src="/CheckError.svg" alt="Check" />
              One number, symbol or special character
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
