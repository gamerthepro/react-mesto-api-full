import React, { useState } from 'react';
import PopupWithForm from './PopupWithForm';

const AddPlacePopup = ({isOpen, onClose, onAddPlace}) => {

	const [name, setName] = useState('');
	const [link, setLink] = useState('');

	const handleChangeName = (evt) => {
		setName(evt.target.value);
	}

	const handleChangeLink = (evt) => {
		setLink(evt.target.value);
	}

	const handleSubmit = e => {
		e.preventDefault();
		onAddPlace({
			name,
			link
		});
	}

	return (
		<PopupWithForm
			title="Новое место"
         name={"add"}
         textBtn="Создать"
         isOpen={isOpen}
         onClose={onClose}
			onSubmit={handleSubmit}
			>

			<input className="popup__input popup__input_edit_name popup__input_img_name" 
				id='name-img'  
				placeholder="Название" 
				type="text" 
				name="name"  
				minLength="2"
				maxLength="30"
				noValidate 
				required
				value={name || ''}
				onChange={handleChangeName}
				/>
			<span className='popup__error' id='name-img-error'></span>
			<input className="popup__input popup__input_img_link" 
				id='img-link' 
				placeholder="Ссылка на картинку" 
				type="url" 
				name="link" 
				noValidate
				value={link || ''}
				required
				onChange={handleChangeLink}
				/>
			<span className='popup__error' id='img-link-error'></span>
		</PopupWithForm>
	)
}

export default AddPlacePopup;