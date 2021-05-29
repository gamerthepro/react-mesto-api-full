import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

const Card = ({card, onCardClick, onCardLike, onCardDelete}) => {

   const currentUser = React.useContext(CurrentUserContext);

   const handleClick = () => {
      onCardClick({
         link: card.link,
         name: card.name,
      })
   }

   const handleLikeClick = () => {
      onCardLike(card)
   }

   const handleDeleteClick = () => {
      onCardDelete(card._id)
   }

   const isOwner = card.owner._id === currentUser._id;
   const cardDeleteButtonClassName = (`element__delete ${!isOwner && 'element__delete_disable'}`);

   const isLiked = card.likes.some(item => item._id === currentUser._id);
   const cardLikeButtonClassName = (`element__like ${isLiked && 'element__like_button_active'}`);

   return(
		<section className="element-template">
			<li className="element">
				<button className={cardDeleteButtonClassName} onClick={handleDeleteClick} type="button"></button>
				<img className="element__image" src={card.link} onClick={handleClick} alt="Фото в ленте mesto"/>
				<div className="element__block">
					<h2 className="element__title">{card.name}</h2>
					<div className="element__wrap_like">
						<button className={cardLikeButtonClassName} onClick={handleLikeClick} type="button"></button>
						<div className="element__like_count">{card.likes.length}</div>
					</div>
				</div>
			</li>
		</section>
	);
}

export default Card;