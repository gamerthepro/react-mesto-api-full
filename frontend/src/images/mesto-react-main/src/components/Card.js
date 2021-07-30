import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({card, onCardClick, onCardLike, onCardDelete}) {

  const currentUser = React.useContext(CurrentUserContext);

  const isOwner = card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = (
    `card__btn-remove ${!isOwner && 'card__btn-remove_disable'}`
  );

  const isLiked = card.likes.some(item => item._id === currentUser._id);
  const cardLikeButtonClassName = (
    `card__btn-like ${isLiked && 'card__btn-like_active'}`
  );

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


  return (
    <div className="card">
      <button type="button" className={cardDeleteButtonClassName} onClick={handleDeleteClick}></button>
      <img className="card__image" src={card.link} alt={`Изображение места: ${card.name}`} onClick={handleClick} />
      <div className="card__wrap">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__wrap-like">
          <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
          <div className="card__like-count">{card.likes.length}</div>
        </div>
      </div>
    </div>
  )
}

export default Card;
