function ImagePopup(props) {

	return (
		<div className={`popup popup_type_image ${props.card.link && 'popup__open'}`}>
			<figure className="popup__container popup__container_image">
				<button className="popup__close popup__close_image" type="button" aria-label="Закрыть" onClick={props.onClose}></button>
				<img className="popup__img" src={props.card.link} alt={`Изображение места: ${props.card.name}`}/>
				<figcaption className="popup__caption">{props.card.name}</figcaption>
			</figure>
		</div>
	);
}

export default ImagePopup;