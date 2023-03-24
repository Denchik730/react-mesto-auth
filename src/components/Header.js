import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';

import MenuMobile from './MenuMobile';

import closeMenuIcon from '../images/close-icon-mobile-menu.svg';
import hamburger from '../images/hamburger.svg'

function Header(props) {

  const isMobileMenuOpen = false;

  return (
    <header className="header page__header">
      {/* <MenuMobile/> */}
      <div className="header__wrapper">
        <div className="logo header__logo"/>
        <Routes>
          <Route path="/sign-in" element={
            <Link to="/sign-up" className='header__link'>Регистрация</Link>
          }/>

          <Route path="/sign-up" element={
            <Link to="/sign-in" className='header__link'>Войти</Link>
          }/>

          <Route path="/" element={(
            <>
              <div className="header__wrapper-links">
                <p className="header__email">{props.emailUser}</p>
                <Link to="/sign-in" className="header__link">Выйти</Link>
              </div>
              <button
                className="header__hamburger"
                type="button"
                style={{
                  backgroundImage: `url(${
                    isMobileMenuOpen ? closeMenuIcon : hamburger
                  })`,
                }}/>
            </>
          )}/>
        </Routes>

      </div>
    </header>
  );
}

export default Header;
