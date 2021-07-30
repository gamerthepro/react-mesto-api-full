import React from 'react';
import Logo from '../images/logo/Vector.png';
import { Link, useLocation } from 'react-router-dom';


const Header = ({userEmail, onSignOut}) => {

	const location = useLocation();

	return (
		<header className="header page__header">
			<img className="logo" src={Logo} alt="логотип Mesto России"/>
			<div className="header__links">
				<p className="header__link header__link_email">
					{
						location.pathname === "/" ? userEmail : ""
					}
					</p>
				<Link to={
					location.pathname === "/sign-up" ? "/sign-in" : location.pathname === "/sign-in" ? "/sign-up" : "/sign-in"
				}
				className="header__link header__link_logout" onClick={onSignOut}>
					{
					location.pathname === "/sign-up" ? "Войти" : location.pathname === "/sign-in" ? "Регистрация" : "Выйти"
					}
				</Link>
			</div>
		</header>
	);
}

export default Header

