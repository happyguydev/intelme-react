import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { Typography } from '@material-ui/core';
import { Button } from '@material-ui/core';

import Line from '../../../line';
import Link from '../../../link';

import changePasswordStyles from './styles';
import FormField from '../../../formField';
import {
  checkAuthToken,
  getToken,
  resetPassword,
} from '../../../../services/auth';

const ChangePassword = ({ onShowChangePassword }) => {
  const changePasswordStyle = changePasswordStyles();

  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordValidations, setPasswordvalidations] = useState({
    atleast8CharactersLong: false,
    oneLowerCaseLetter: false,
    oneUpperCaseLetter: false,
    oneNumberSymbolSpecialChar: false,
  });
  const [error, setError] = useState({
    passwordIncorrect: false,
    passwordDoesNotMeetRequire: false,
    passwordDoesNotMatch: false,
  });
  const [cookies] = useCookies(['intelme']);

  const newPasswordAreValid = Boolean(
    !passwordValidations.atleast8CharactersLong ||
      !passwordValidations.oneLowerCaseLetter ||
      !passwordValidations.oneUpperCaseLetter ||
      !passwordValidations.oneNumberSymbolSpecialChar
  );

  const handlePasswordChange = (v) => {
    let password = v.target.value;
    setPassword(password);
    setError({ ...error, passwordIncorrect: false });
  };

  const handleNewPasswordChange = (v) => {
    const password = v.target.value;

    setNewPassword(password);

    if (password.length >= 8) {
      setPasswordvalidations((passwordValidations) => ({
        ...passwordValidations,
        atleast8CharactersLong: true,
      }));
    } else {
      setPasswordvalidations((passwordValidations) => ({
        ...passwordValidations,
        atleast8CharactersLong: false,
      }));
    }

    // checks for lower case in password
    if (password.match(/[a-z]/)) {
      setPasswordvalidations((passwordValidations) => ({
        ...passwordValidations,
        oneLowerCaseLetter: true,
      }));
    } else {
      setPasswordvalidations((passwordValidations) => ({
        ...passwordValidations,
        oneLowerCaseLetter: false,
      }));
    }

    // checks for upper case in password
    if (password.match(/[A-Z]/)) {
      setPasswordvalidations((passwordValidations) => ({
        ...passwordValidations,
        oneUpperCaseLetter: true,
      }));
    } else {
      setPasswordvalidations((passwordValidations) => ({
        ...passwordValidations,
        oneUpperCaseLetter: false,
      }));
    }

    // check for number, symbol or special character
    if (
      /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/.test(password) ||
      /\d/.test(password)
    ) {
      setPasswordvalidations((passwordValidations) => ({
        ...passwordValidations,
        oneNumberSymbolSpecialChar: true,
      }));
    } else {
      setPasswordvalidations((passwordValidations) => ({
        ...passwordValidations,
        oneNumberSymbolSpecialChar: false,
      }));
    }
  };

  const handleConfirmPasswordChange = (v) => {
    const password = v.target.value;

    if (password !== newPassword && password.length > 0) {
      setError((error) => ({ ...error, passwordDoesNotMatch: true }));
    } else {
      setError((error) => ({ ...error, passwordDoesNotMatch: false }));
    }

    setConfirmPassword(password);
  };

  const onSubmitChangePassword = async () => {
    const { username } = cookies;

    try {
      const token = await getToken();

      await checkAuthToken({
        tenant: token.tenantId,
        username: username,
        password: password,
      });

      await resetPassword({
        username: username,
        password: newPassword,
      });

      // toast.success(
      //   'You have successfully changed your password.',
      //   toastConfig
      // );

      console.log('Success');

      setPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      setError({
        ...error,
        passwordIncorrect: true,
      });
    }
  };

  return (
    <div>
      <Typography className={changePasswordStyle.title}>
        Set a new password for your account
      </Typography>
      <div className={changePasswordStyle.container}>
        <div className={changePasswordStyle.fieldsContainer}>
          <FormField
            value={password}
            onChange={handlePasswordChange}
            error={error.passwordIncorrect}
            placeholder="Current Password"
            label="Current password"
            type="password"
            helperText={error.passwordIncorrect && 'Incorrect password..'}
          />
          <div className={changePasswordStyle.lineStyle}>
            <Line />
          </div>
          <FormField
            value={newPassword}
            onChange={handleNewPasswordChange}
            placeholder="New Password"
            label="New password"
            type="password"
            error={
              (newPasswordAreValid && newPassword.length > 0) ||
              (newPassword.length > 0 &&
                confirmPassword.length > 0 &&
                newPassword !== confirmPassword)
            }
            helperText={
              newPasswordAreValid &&
              newPassword.length > 0 &&
              'New password does not meet requirements.'
            }
          />
          <FormField
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            placeholder="Confirm new Password"
            label="Confirm new password"
            type="password"
            error={
              newPassword !== confirmPassword && confirmPassword.length > 0
            }
            helperText={
              newPassword !== confirmPassword &&
              confirmPassword.length > 0 &&
              'Passwords do not match.'
            }
          />
        </div>
        <div className={changePasswordStyle.textContainer}>
          <Typography className={changePasswordStyle.textTitle}>
            PASSWORD REQUIREMENTS
          </Typography>
          <div className={changePasswordStyle.textDetail}>
            <img
              alt="Checked"
              height="7.33px"
              width="10.67px"
              src={
                passwordValidations.atleast8CharactersLong
                  ? '/CheckSuccess.svg'
                  : '/CheckNeutral.svg'
              }
            />
            <Typography>At least 8 characters long</Typography>
          </div>
          <div className={changePasswordStyle.textDetail}>
            <img
              alt="Checked"
              height="7.33px"
              width="10.67px"
              src={
                passwordValidations.oneLowerCaseLetter
                  ? '/CheckSuccess.svg'
                  : '/CheckNeutral.svg'
              }
            />
            <Typography>One lower case letter</Typography>
          </div>
          <div className={changePasswordStyle.textDetail}>
            <img
              alt="Checked"
              height="7.33px"
              width="10.67px"
              src={
                passwordValidations.oneUpperCaseLetter
                  ? '/CheckSuccess.svg'
                  : '/CheckNeutral.svg'
              }
            />
            <Typography>One upper case letter</Typography>
          </div>
          <div className={changePasswordStyle.textDetail}>
            <img
              alt="Checked"
              height="7.33px"
              width="10.67px"
              src={
                passwordValidations.oneNumberSymbolSpecialChar
                  ? '/CheckSuccess.svg'
                  : '/CheckNeutral.svg'
              }
            />
            <Typography>One number, symbol, or special character</Typography>
          </div>
        </div>
      </div>
      <div className={changePasswordStyle.actionBtns}>
        <Link onPress={onShowChangePassword}>Cancel</Link>
        <Button
          disabled={
            error.passwordDoesNotMatch ||
            error.passwordDoesNotMeetRequire ||
            !password.length > 0 ||
            !confirmPassword.length > 0
          }
          className={changePasswordStyle.submitButton}
          onClick={onSubmitChangePassword}
        >
          Save changes
        </Button>
      </div>
    </div>
  );
};

export default ChangePassword;
