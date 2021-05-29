import React from 'react';

function PopupWithForm(props) {

	return(
		<div className={`popup popup_type_${props.name} ${props.isOpen && 'popup__open'}`}>
		<div className="popup__container">
			<button className="popup__close popup__close_edit" type="button" aria-label="Закрыть" onClick={props.onClose}></button>
			<h2 className="popup__title">{props.title}</h2>
			<form className={`popup__form popup__form_${props.name}`} onSubmit={props.onSubmit} noValidate>
				{props.children}
				<button className="popup__save" type="submit">{props.textBtn}</button>
			</form>
		</div>
	</div>
	);
}

export default PopupWithForm;