import { Link } from 'react-router-dom';

const MenuMobile = () => {
  return (
    <section className="menu-mobile">
      <h2 className="menu-mobile__email">gabbas.denn@mail.ru</h2>
      <Link to="/sign-in" className="menu-mobile__sign-out">Выйти</Link>
    </section>
  );
}

export default MenuMobile;
