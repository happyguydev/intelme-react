import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';

import FieldContainer from '../../components/fieldContainer';
import FormField from '../../components/formField';
import ReCAPTCHAContainer from '../../components/recaptchaContainer';
import CustomCheckbox from '../../components/checkbox';

import { getRoles, checkStatus } from '../../store/actions/auth';

import './styles.scss';
import { login } from '../../services/auth';
import { SET_AUTH_DETAILS } from '../../store/types';
import LoginImage from '../../assets/images/activation-illustration.svg';
import { error } from '../../utils/successToast';
const Login = () => {
  const [fields, setFields] = useState({
    tenant: '',
    username: '',
    password: '',
    rememberMe: false,
  });

  const dispatch = useDispatch();
  const [cookie, setCookie] = useCookies(['intelme']);
  const [captchaIsOkay, setCaptchaIsOkay] = useState(false);
  const [redirect, setRedirect] = useState('');

  const formInputsAreValid = Boolean(
    !fields.username || !fields.tenant || !fields.password
    // || !captchaIsOkay
  );

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login({
        tenant: fields.tenant,
        username: fields.username,
        password: fields.password,
        remember_me: fields.rememberMe,
      });

      const userStatus = await dispatch(checkStatus());
      if (userStatus.state === 'activated') {
        dispatch({
          type: SET_AUTH_DETAILS,
          payload: res,
        });

        dispatch(getRoles({ username: fields.username }));

        setCookie('username', fields.username, { path: '/' });

        setRedirect('dashboard');
      }
    } catch (err) {
      if (err?.response?.status === 401)
        return error('Unauthorised attempt to login');
      if (err?.response?.status === 500)
        return 'We have encountered a technical error on the platform. Please try again later or contact your administrator.';
    }
  };

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

  return (
    <div className="login-wrapper">
      {redirect && <Redirect to={redirect} />}
      <div className="image-wrapper">
        <img src={LoginImage} alt="Login Illustration" />
      </div>
      <div className="form-container">
        <h1>Login</h1>
        <form action="" onSubmit={onSubmit}>
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
          <div className="checkboxAndLink">
            <CustomCheckbox
              value={fields.rememberMe}
              handleChange={(e) => {
                setFields((previous) => ({
                  ...previous,
                  rememberMe: e.target.checked,
                }));
              }}
              label="Remember Me"
            />
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
          {/* <ReCAPTCHAContainer handleChange={() => setCaptchaIsOkay(true)} /> */}
          <Button
            className="loginButton"
            disabled={formInputsAreValid}
            type="submit"
          >
            LOGIN
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
