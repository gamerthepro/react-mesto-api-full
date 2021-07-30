import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmDeletePopup from './ConfirmDeletePopup';

function App() {

  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [selectedDelCard, setSelectedDelCard] = useState('');

  const errorApi = err => {
    console.error(err);
    };

  useEffect(() => {
    api
      .getUserInfoServ()
      .then(data => {
        setCurrentUser(data)
      })
      .catch(errorApi)
  }, [])

  useEffect(() => {
    api
      .getCardList()
      .then(data => {
        setCards(data)
      })
      .catch(errorApi)
  }, [])

  const handleCardClick = (data) => {
    setSelectedCard(data);
  }

  const handleDeleteClick = (cardId) => {
    setIsConfirmPopupOpen(!isConfirmPopupOpen);
    setSelectedDelCard(cardId)
  }

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  const handleUpdateUser = (data) => {
    api
      .saveUserInfoServ(data)
      .then(newData => {
        setCurrentUser(newData)
        closeAllPopups()
      })
      .catch(errorApi)
  }

  const handleUpdateAvatar = (link) => {
    api
      .updateAvatar(link)
      .then(newData => {
        setCurrentUser(newData)
        closeAllPopups()
      })
      .catch(errorApi)
  }

  const handleCardLike = (card) => {
    const isLiked = card.likes.some(item => item._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then(newCard => {
        setCards(state => state.map(item => item._id === card._id ? newCard : item))
      })
      .catch(errorApi)
  }

  const handleAddPlaceSubmit = (card) => {
    api
      .saveNewCard(card)
      .then(newCard => {
        setCards([newCard, ...cards])
        closeAllPopups()
      })
      .catch(errorApi)
  }

  const handleCardDelete = (cardId) => {
    api
      .removeCard(cardId)
      .then(res => {
        res && setCards(cards => cards.filter(item => item._id !== cardId))
        closeAllPopups()
      })
      .catch(errorApi)
  }

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsConfirmPopupOpen(false);
    setSelectedCard({});
    setSelectedDelCard('');
  }

  return (
    <div className="page">
      <div className="page__content">
        <CurrentUserContext.Provider value={currentUser}>
          <Header />

          <Main
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onCardLike={handleCardLike}
            handleDeleteClick={handleDeleteClick}
            onAddPlace={handleAddPlaceClick}
            handleCardClick={handleCardClick}
            cards={cards}
          />

          <Footer />

          <ImagePopup card={selectedCard} onClose={closeAllPopups} />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />

          <ConfirmDeletePopup
            isOpen={isConfirmPopupOpen}
            onClose={closeAllPopups}
            onCardDelete={handleCardDelete}
            idCard={selectedDelCard}
          />
        </CurrentUserContext.Provider>
      </div>
    </div>
  );
}

export default App;
