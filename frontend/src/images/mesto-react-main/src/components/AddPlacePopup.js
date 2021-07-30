import React, { useState } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({isOpen, onClose, onAddPlace}) {

  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    onAddPlace({
      name,
      link
    });
  }

  return (
    <PopupWithForm
      name="card"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Новое место"
      titleButton="Создать"
    >
      <input className="popup__input popup__input_content_place-name" type="text" name="name" placeholder="Название"
        tabIndex="1" id="name-card" minLength="2" maxLength="30" required
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <span id="name-card-error" className="popup__input-error"></span>
      <input className="popup__input popup__input_content_image-link" type="url" name="link"
        placeholder="Ссылка на картинку" tabIndex="2" id="link-card" required
        value={link}
        onChange={e => setLink(e.target.value)}
        />
      <span id="link-card-error" className="popup__input-error"></span>
    </PopupWithForm>
  )
}

export default AddPlacePopup;
