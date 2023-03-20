import registerSuccess from '../images/poup-register-success.png';
import registerError from '../images/poup-register-error.png';

const InfoTooltip = () => {
  return (
    <section className={`popup`}>
      <div className="popup__container">
        <img className="popup__info-tooltip-image" src={registerSuccess} alt="" />
        <h2 className="popup__title-form popup__title-form_type_infotooltip">Вы успешно зарегистрировались!</h2>
        <button
          type="button"
          aria-label="Закрыть"
          className="popup__close"/>
      </div>
    </section>
  );
}

export default InfoTooltip;
