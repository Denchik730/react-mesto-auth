
const Register = () => {
  return (
    <form className="auth__form">
    <h2 className="auth__title-form">Регистрация</h2>
    <input
      required
      id="email-register-input"
      name="email"
      type="email"
      className="auth__input"
      placeholder="Email"
      minLength="2"
      maxLength="30"/>
    <span className="auth__input-error email-register-input-error"></span>
    <input
      required
      id="password-register-input"
      name="password"
      type="password"
      className="auth__input"
      placeholder="Пароль"/>
    <span className="auth__input-error password-register-input-error"></span>
    <button
      type="submit"
      className="auth__submit-button">
      Зарегистрироваться
    </button>
    <a className="auth__link-login" href="#">Уже зарегистрированы? Войти</a>
  </form>
  );
}

export default Register;
