import { useState } from 'react';

const Login = ({onLogin}) => {

   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');

   const handleSubmit = (e) => {
      e.preventDefault();
      onLogin(email, password);
   }

   const handleEmailChange = (e) => {
      setEmail(e.target.value);
   }

   const handlePasswordChange = (e) => {
      setPassword(e.target.value);
   }

	return(
			<form className="register" onSubmit={handleSubmit}>
				<p className="register__title">Вход</p>
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
				<button className="register__button" type="submit">Войти</button>
			</form>
	)
}

export default Login;
