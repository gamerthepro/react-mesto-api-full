function ImagePopup(props) {
  // console.log(!props.card.link)
  return (
    <div className={`popup popup_type_image ${props.card.link && 'popup_open'}`}>
      <div className="popup__image-conteiner">
        <button className="popup__icon-close" onClick={props.onClose}></button>
        <img src={props.card.link} alt={`Изображение места: ${props.card.name}`} className="popup__pic" />
        <h3 className="popup__pic-title">{props.card.name}</h3>
      </div>
    </div>
  )
}

export default ImagePopup;
