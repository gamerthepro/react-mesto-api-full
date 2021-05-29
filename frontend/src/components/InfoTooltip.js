import success from '../images/success-icon.svg';
import error from '../images/error-icon.svg';

function InfoTooltip({status, onClose, isOpen}) {

	const isInfoTooltip = isOpen ? 'popup__open' : true;

   return(
      <div className={`popup ${isInfoTooltip}`}>
            <div className="infotooltip">
               <img className="infotooltip__img" src={status ? success : error} alt={status ? "Успех" : "Неудача"}/>
               <p className="infotooltip__text">{status ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз." }</p>
               <button className="infotooltip__button infotooltip__button_type_close" type="button" aria-label="Закрыть" onClick={onClose}/>
            </div>
      </div>
   );
};

export default InfoTooltip;