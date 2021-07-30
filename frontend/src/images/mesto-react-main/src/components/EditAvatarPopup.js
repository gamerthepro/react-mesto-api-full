import React, { useRef } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {

  const urlRef = useRef();

  const handleSubmit = e => {
    e.preventDefault();
    onUpdateAvatar({avatar: urlRef.current.value});
  }

  return (
    <PopupWithForm
      name="avatar"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Обновить аватар"
      titleButton="Сохранить"
    >
      <input className="popup__input popup__input_content_image-link" type="url" name="link" defaultValue=""
        placeholder="Ссылка на картинку" tabIndex="2" id="link-avatar" required
        ref={urlRef}
        />
      <span id="link-avatar-error" className="popup__input-error"></span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;
