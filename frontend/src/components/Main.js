import React, { useContext } from 'react';
import Card from "./Card";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {

	const currentUser = useContext(CurrentUserContext);

	return (
		<main className="content page__content">
			<section className="profile">
				<div className="profile__list">
					<div className="profile__overlay" onClick={props.onEditAvatar}>
						<img className="profile__avatar" src={currentUser.avatar} alt="Изображение профиля"/>
					</div>
					<div className="profile__info">
						<h1 className="profile__title">{currentUser.name}</h1>
						<button className="profile__button profile__button_open_edit" type="button" onClick={props.onEditProfile}></button>
						<p className="profile__subtitle">{currentUser.about}</p>
					</div>
					<div className="profile__add">
						<button className="profile__button profile__button_open_add" type="button" onClick={props.onAddPlace}></button>
					</div>
				</div>
			</section>
			<section className="elements">
				<ul className="elements__contener">
					{props.cards.map(item =>
							<Card
							key={item._id}
							card={item}
							onCardClick={props.handleCardClick}
							onCardLike={props.onCardLike}
							onCardDelete={props.handleDeleteClick}
							/>
						)}
				</ul>
			</section>
		</main>
	);
}

export default Main;