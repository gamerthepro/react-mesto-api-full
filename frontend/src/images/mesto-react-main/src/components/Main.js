import React, { useContext } from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {

  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="main-content">
      <section className="profile">
        <div className="profile__wrap-avatar" onClick={props.onEditAvatar}>
          <img className="profile__avatar" src={currentUser.avatar} alt="Изображение профиля" />
        </div>
        <div className="profile__wrap">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button type="button" className="profile__btn-edit" onClick={props.onEditProfile}></button>
          <p className="profile__text-interests">{currentUser.about}</p>
          <button type="button" className="profile__btn-add button" onClick={props.onAddPlace}></button>
        </div>
      </section>

      <section className="elements">
        {
          props.cards.map(item =>
            <Card
              key={item._id}
              card={item}
              onCardClick={props.handleCardClick}
              onCardLike={props.onCardLike}
              onCardDelete={props.handleDeleteClick}
            />
          )
        }
      </section>
    </main>
  )
}

export default Main;
