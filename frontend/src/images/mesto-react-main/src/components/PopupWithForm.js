function PopupWithForm(props) {
  return (
    <div className={`popup popup_type_${props.name} ${props.isOpen && 'popup_open'}`}>
      <div className="popup__content">
        <h2 className="popup__title">{props.title}</h2>
        <button type="button" className="popup__icon-close" onClick={props.onClose}></button>
        <form onSubmit={props.onSubmit} className={`popup__form popup_type_${props.name}`} name="popup-form" noValidate>

          {props.children}

          <button type="submit" className="popup__submit button">{props.titleButton}</button>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm;
