import registerSuccess from '../images/poup-register-success.png';
import registerError from '../images/poup-register-error.png';

const InfoTooltip = (props) => {
  return (
    <section className={`popup ${props.isOpen && 'popup_opened'}`}>
      <div className="popup__container">
        <img className="popup__info-tooltip-image" src={props.isSuccessRegister ? registerSuccess : registerError} alt="" />
        <h2 className="popup__title-form popup__title-form_type_infotooltip">
          {props.isSuccessRegister ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}
        </h2>
        <button
          onClick={props.onClose}
          type="button"
          aria-label="Закрыть"
          className="popup__close"/>
      </div>
    </section>
  );
}

export default InfoTooltip;
