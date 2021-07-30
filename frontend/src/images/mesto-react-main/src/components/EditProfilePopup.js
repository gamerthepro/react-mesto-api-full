import React, { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup ({isOpen, onClose, onUpdateUser}) {

  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  return (
    <PopupWithForm
      name="profile"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Редактировать профиль"
      titleButton="Сохранить"
    >
      <input className="popup__input popup__input_content_username" type="text" name="name" placeholder="Имя"
        tabIndex="1" id="username-profile" minLength="2" maxLength="40" required
        value={name || ''}
        onChange={e => setName(e.target.value)}
      />
      <span id="username-profile-error" className="popup__input-error"></span>
      <input className="popup__input popup__input_content_about" type="text" name="about" placeholder="О себе"
        tabIndex="2" id="about-profile" minLength="2" maxLength="200" required
        value={description || ''}
        onChange={e => setDescription(e.target.value)}
      />
      <span id="about-profile-error" className="popup__input-error"></span>
    </PopupWithForm>
  )
}

export default EditProfilePopup;
