import React from 'react';

import { Link, useNavigate } from 'react-router-dom';

import { useForm } from '../hooks/useForm';

import * as auth from '../utils/auth';

const Register = () => {

  const {values, handleChange, setValues} = useForm({});

  const navigate = useNavigate();

  React.useEffect(() => {
    setValues({})
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const  {password, email} = values
    auth.register(password, email)
      .then(data => {
        navigate('/sign-in', {replace: true});
      })
  }

  return (
    <form onSubmit={handleSubmit} className="auth__form">
      <h2 className="auth__title-form">Регистрация</h2>
      <input
        required
        id="email-register-input"
        name="email"
        type="email"
        className="auth__input"
        placeholder="Email"
        minLength="2"
        maxLength="30"
        value={values.email || ''}
        onChange={handleChange}/>
      <span className="auth__input-error email-register-input-error"></span>
      <input
        required
        id="password-register-input"
        name="password"
        type="password"
        className="auth__input"
        placeholder="Пароль"
        value={values.password || ''}
        onChange={handleChange}/>
      <span className="auth__input-error password-register-input-error"></span>
      <button
        type="submit"
        className="auth__submit-button">
        Зарегистрироваться
      </button>
      <p className="auth__descr-link" href="#">Уже зарегистрированы? <Link to="/sign-in" className="auth__link-login">Войти</Link></p>
    </form>
  );
}

export default Register;
