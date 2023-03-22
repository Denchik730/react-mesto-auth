
const Login = () => {
  return (
    <form className="auth__form">
    <h2 className="auth__title-form">Вход</h2>
    <input
      required
      id="email-login-input"
      name="email"
      type="email"
      className="auth__input"
      placeholder="Email"
      minLength="2"
      maxLength="30"/>
    <span className="auth__input-error email-login-input-error"></span>
    <input
      required
      id="password-login-input"
      name="password"
      type="password"
      className="auth__input"
      placeholder="Пароль"/>
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
