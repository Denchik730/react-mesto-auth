

const Register = () => {
  return (
    <form className="register__form">
    <h2 className="register__title-form">Регистрация</h2>
    <input
      required
      id="email-register-input"
      name="email"
      type="email"
      className="register__input"
      placeholder="Email"
      minLength="2"
      maxLength="30"/>
    <span className="register__input-error email-register-input-error"></span>
    <input
      required
      id="password-register-input"
      name="password"
      type="password"
      className="register__input"
      placeholder="Пароль"/>
    <span className="register__input-error password-register-input-error"></span>
    <button
      type="submit"
      className="register__submit-button">
      Зарегистрироваться
    </button>
    <a className="register__link-login" href="#">Уже зарегистрированы? Войти</a>
  </form>
  );
}

export default Register;
