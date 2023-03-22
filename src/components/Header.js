import closeMenuIcon from '../images/close-icon-mobile-menu.svg';
import hamburger from '../images/hamburger.svg'

function Header() {
  return (
    <header className="header page__header">

      <div className="header__wrapper">
        <div className="logo header__logo"/>
        <div className="header__wrapper-links">
          <p className="header__email">gabbas.denn@mail.ru</p>
          <a className="header__link" href="#">Войти</a>
          <button
            className="header__hamburger"
            type="button"/>
        </div>
      </div>
    </header>
  );
}

export default Header;
