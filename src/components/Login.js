import React from 'react';

import { useNavigate } from 'react-router-dom';

import { useForm } from '../hooks/useForm';

import * as auth from '../utils/auth';

const Login = (props) => {

  const {values, handleChange, setValues} = useForm({});

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const  {password, email} = values
    if (!password || !email){
      return;
    }
    auth.authorize(password, email)
      .then(data => {
        if (data.token){
          setValues({});
          props.handleLogin();
          navigate('/', {replace: true});
        }
      })
  }

  return (
    <form onSubmit={handleSubmit} className="auth__form">
    <h2 className="auth__title-form">Вход</h2>
    <input
      required
      id="email-login-input"
      name="email"
      type="email"
      className="auth__input"
      placeholder="Email"
      minLength="2"
      maxLength="30"
      value={values.email || ''}
      onChange={handleChange}/>
    <span className="auth__input-error email-login-input-error"></span>
    <input
      required
      id="password-login-input"
      name="password"
      type="password"
      className="auth__input"
      placeholder="Пароль"
      value={values.password || ''}
      onChange={handleChange}/>
    <span className="auth__input-error password-login-input-error"></span>
    <button
      type="submit"
      className="auth__submit-button">
      Войти
    </button>
  </form>
  );
}

export default Login;
