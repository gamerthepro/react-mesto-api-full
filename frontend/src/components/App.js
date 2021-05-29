import React, { useState, useEffect } from 'react';
import { Route, Switch, useHistory, Redirect } from 'react-router-dom';
import api from '../utils/api';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmDeletePopup from './ConfirmDeletePopup';
import ProtectedRoute from './ProtectedRoute';
import auth from '../utils/auth';
import InfoTooltip from './InfoTooltip';
import Login from './Login';
import Register from './Register';

function App() {

	const [currentUser, setCurrentUser] = useState({});
	const [cards, setCards] = useState([]);

	const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
	const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
	const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
	const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
	const [selectedCard, setSelectedCard] = useState({});
	const [selectedDelCard, setSelectedDelCard] = useState('');

	const [loggedIn, setLoggedIn] = useState(false);
	const [userEmail, setUserEmail] = useState('');
	const [isAuthReqSusses, setAuthReqSusse] = useState(false);
	const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
	const history = useHistory();

	const handleRegister = (email, password) => {
		auth.signup(password, email)
			.then((res) => {
				setIsInfoTooltipOpen(true);
				setAuthReqSusse(true);
				history.push('/sign-in');
			})
			.catch(() => {
				setIsInfoTooltipOpen(true);
				setAuthReqSusse(false);
			})
	}

	const handleLogin = (email, password) => {
		auth.signin(password, email)
			.then((res) => {
				setLoggedIn(true);
				setUserEmail(email);
				localStorage.setItem('jwt', res.token);
				history.push('/'); 
			})
			.catch(() => {
				setIsInfoTooltipOpen(true);
				setAuthReqSusse(false);
			})
	}

	const handleSignOut = () => {
		if (loggedIn === true) {
			localStorage.removeItem('jwt');
			history.push('/sign-in');
		}
	}
	
	const tokenCheck = () => {
		if (localStorage.getItem('jwt')) {
			const token = localStorage.getItem('jwt');
			if (token) {
				auth.getContent(token)
					.then((res) => {
						if (res) {
							setUserEmail(res.data.email);
						};
						setLoggedIn(true);
						history.push("/");
				})
				.catch(showErrorApi)
			}
		}
	}

	const handleCardClick = (data) => {
		setSelectedCard(data);
	}

	const handleDeleteClick = (cardId) => {
		setIsConfirmPopupOpen(!isConfirmPopupOpen);
		setSelectedDelCard(cardId)
	}

	const handleEditAvatarClick = () => {
		setIsEditAvatarPopupOpen(true);
	}

	const handleEditProfileClick = () => {
		setIsEditProfilePopupOpen(true);
	}

	const handleAddPlaceClick = () => {
		setIsAddPlacePopupOpen(true);
	}

	useEffect(() => {
		handleUserData();
	}, [])

	useEffect(() => {
		tokenCheck()
	}, []);

	const showErrorApi = err => {
		console.error(err);
		};

	const handleUserData = () => {
		api
			.getUserInfoServ()
			.then(data => {
			setCurrentUser(data)
			})
			.catch(showErrorApi)
	}

	useEffect(() => {
		api
			.getCardList()
			.then(data => {
			setCards(data)
			})
			.catch(showErrorApi)
	}, [])

	const handleUpdateUser = (data) => {
		api
			.saveUserInfoServ(data)
			.then(newData => {
			setCurrentUser(newData)
			closeAllPopups()
			})
			.catch(showErrorApi)
	}

	const handleUpdateAvatar = (link) => {
		api
			.updateAvatar(link)
			.then(newData => {
			setCurrentUser(newData)
			closeAllPopups()
			})
			.catch(showErrorApi)
	}

	const handleCardLike = (card) => {
		const isLiked = card.likes.some(item => item._id === currentUser._id);
		api
			.changeLikeCardStatus(card._id, !isLiked)
			.then(newCard => {
			setCards(state => state.map(item => item._id === card._id ? newCard : item))
			})
			.catch(showErrorApi)
	}

	const handleAddPlaceSubmit = (card) => {
		api
			.saveNewCard(card)
			.then(newCard => {
			setCards([newCard, ...cards])
			closeAllPopups()
			})
			.catch(showErrorApi)
	}

	const handleCardDelete = (cardId) => {
		api
			.removeCard(cardId)
			.then(res => {
			res && setCards(cards => cards.filter(item => item._id !== cardId))
			closeAllPopups()
			})
			.catch(showErrorApi)
	}

	const closeAllPopups = () => {
		setIsEditAvatarPopupOpen(false);
		setIsEditProfilePopupOpen(false);
		setIsAddPlacePopupOpen(false);
		setIsConfirmPopupOpen(false);
		setSelectedCard({});
		setSelectedDelCard('');
		setIsInfoTooltipOpen(false);
	}


	return (
		<CurrentUserContext.Provider value={currentUser}>
			<div className="page">
				<div className="page__container">

						<Header 
                     userEmail={userEmail}
                     onSignOut={handleSignOut}
						/>
						<Switch>

							<ProtectedRoute
								exact
								path="/"
								component={Main}
								loggedIn={loggedIn}
								cards={cards}
								onEditAvatar={handleEditAvatarClick}
								onEditProfile={handleEditProfileClick}
								onCardLike={handleCardLike}
								handleDeleteClick={handleDeleteClick}
								onAddPlace={handleAddPlaceClick}
								handleCardClick={handleCardClick}>
							</ProtectedRoute>

							<Route
								path="/sign-up">
									<Register 
										onRegister={handleRegister}/>
							</Route>

							<Route
								path="/sign-in">
									<Login 
										onLogin={handleLogin}/>
							</Route>

							<Route>
								{loggedIn 
                           ? (<Redirect to="/"/>)
                           : (<Redirect to="/sign-in"/>)
								}
							</Route>

						</Switch>

						<ConfirmDeletePopup
							isOpen={isConfirmPopupOpen}
							onClose={closeAllPopups}
							onCardDelete={handleCardDelete}
							idCard={selectedDelCard}
						></ConfirmDeletePopup>

						<EditAvatarPopup
							isOpen={isEditAvatarPopupOpen}
							onClose={closeAllPopups}
							onUpdateAvatar={handleUpdateAvatar}
						></EditAvatarPopup>

						<EditProfilePopup
							isOpen={isEditProfilePopupOpen}
							onClose={closeAllPopups}
							onUpdateUser={handleUpdateUser}
						></EditProfilePopup>

						<AddPlacePopup
							isOpen={isAddPlacePopupOpen}
							onClose={closeAllPopups}
							onAddPlace={handleAddPlaceSubmit}
						></AddPlacePopup>

						<ImagePopup
							card={selectedCard}
							onClose={closeAllPopups}
						></ImagePopup>
						<InfoTooltip 
                        status={isAuthReqSusses}
                        onClose={closeAllPopups}
                        isOpen={isInfoTooltipOpen}
						/>

						<Footer/>
				</div>
		</div>
		</CurrentUserContext.Provider>
	);
}

export default App;