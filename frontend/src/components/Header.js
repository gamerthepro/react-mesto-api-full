import React from 'react';
import Logo from '../images/logo/Vector.png';

const Header = () => {
	return (
		<header className="header page__header">
			<img className="logo" src={Logo} alt="логотип Mesto России"/>
		</header>
	);
}

export default Header;