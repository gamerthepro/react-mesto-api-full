import { Link } from 'react-router-dom';
import { useState } from 'react';


const Register = ({onRegister}) => {

   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');

   const handleSubmit = (e) => {
      e.preventDefault();
      onRegister(email, password);
   }

   const handleEmailChange = (e) => {
      setEmail(e.target.value);
   }

   const handlePasswordChange = (e) => {
      setPassword(e.target.value);
   }


	return(
		<form className="register" onSubmit={handleSubmit}>
			<p className="register__title">Регистрация</p>
			<input
				className="register__input" 
				type="email"
				placeholder="Email"
				onChange={handleEmailChange}
				required
				minLength='5'
				maxLength='40'
				formNoValidate
			/>
			<input
				className="register__input" 
				type="password"
				placeholder="Пароль"
				onChange={handlePasswordChange}
				required
				minLength='5'
				maxLength='40'
				formNoValidate
			/>
			<button className="register__button" type="submit">Зарегистрироваться</button>
			<div className="register__text">
            Уже зарегистрированы?
            <Link to="/sign-in" className="register__text"> Войти</Link>
			</div>
		</form>
)
}

export default Register;