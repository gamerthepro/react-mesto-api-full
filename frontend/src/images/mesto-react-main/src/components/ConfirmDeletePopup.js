import PopupWithForm from './PopupWithForm';

function ConfirmDeletePopup({isOpen, onClose, onCardDelete, idCard}) {

  const handleSubmit = e => {
    e.preventDefault();
    onCardDelete(idCard);
  }

  return (
    <PopupWithForm
      name="confirm"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Вы уверены?"
      titleButton="Да"
    >
    </PopupWithForm>
  )
}

export default ConfirmDeletePopup;
