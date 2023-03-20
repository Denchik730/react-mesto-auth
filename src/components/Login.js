
const Login = () => {
  return (
    <form className="login__form">
    <h2 className="login__title-form">Вход</h2>
    <input
      required
      id="email-login-input"
      name="email"
      type="email"
      className="login__input"
      placeholder="Email"
      minLength="2"
      maxLength="30"/>
    <span className="login__input-error email-login-input-error"></span>
    <input
      required
      id="password-login-input"
      name="password"
      type="password"
      className="login__input"
      placeholder="Пароль"/>
    <span className="login__input-error password-login-input-error"></span>
    <button
      type="submit"
      className="login__submit-button">
      Войти
    </button>
  </form>
  );
}

export default Login;
