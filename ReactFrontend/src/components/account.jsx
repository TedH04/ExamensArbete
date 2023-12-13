import React, { useState, useContext, useEffect } from 'react';
import "./styling/account.css";
import { UserContext } from '../contexts/UserContext';
import { UserPage } from './userPage';
import { GetRegisterAsync } from '../services/UserService'; // Ensure this is the correct import path

export const Account = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [retypePassword, setRetypePassword] = useState('');
    const { currentUser, login, logout } = useContext(UserContext);

    useEffect(() => {
        if (currentUser && currentUser.name) {
            setName(currentUser.name);
        }
    }, [currentUser]);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await login(loginEmail, loginPassword);
            window.location.reload();
        } catch (error) {
            alert("Login failed: " + error.message);
        }
    };

    const handleRegister = async (e) => {
      e.preventDefault();
    
      if (password !== retypePassword) {
        alert("Passwords do not match.");
        return;
      }
    
      try {
        const userData = {
          username: name,
          email: email,
          password: password,
          phoneNumber: phoneNumber,
        };
    
        const jwtToken = await GetRegisterAsync(userData);
        console.log("Registration successful, token:", jwtToken);
        
        setIsLogin(true);
      } catch (error) {
        alert("Registration failed: " + error.message);
      }
    };

  if (currentUser && currentUser.name) {
    return (
      <>
        <UserPage />
        <div id='account' className="account-container">
          <h2>Welcome, {currentUser.name}</h2>
          <button onClick={logout} className="form-button">Logout</button>
        </div>
      </>
    );
  }

  return (
    <div id='account' className="account-container">
      {isLogin ? (
        /* login formuläret */
        <form className="account-form" onSubmit={handleLogin}>
        <h2 className="form-title">Logga in</h2>
        <div className="form-group">
          <label htmlFor="login-email" className="form-label">Email:</label>
          <input
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
            type="email"
            id="login-email"
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="login-password" className="form-label">Password:</label>
          <input
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
            type="password"
            id="login-password"
            className="form-input"
            required
          />
        </div>
        <button type="submit" className="form-button">Logga in</button>
        <button type="button" className="form-toggle" onClick={() => setIsLogin(false)}>Inget konto än? Registrera</button>
      </form>
      ) : (
        /* registrerings formuläret */
        <form className="account-form" onSubmit={handleRegister}>
          <h2 className="form-title">Registrering</h2>
          <div className="form-group">
            <label htmlFor="register-name" className="form-label">Name:</label>
            <input
              type="text"
              id="register-name"
              className="form-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="register-email" className="form-label">Email:</label>
            <input
              type="email"
              id="register-email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="register-number" className="form-label">Telefonnummer:</label>
            <input
              type="phonenumber"
              id="register-number"
              className="form-input"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="register-password" className="form-label">Password:</label>
            <input
              type="password"
              id="register-password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="retype-password" className="form-label">Retype Password:</label>
            <input
              type="password"
              id="retype-password"
              className="form-input"
              value={retypePassword}
              onChange={(e) => setRetypePassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="form-button">Registrera</button>
          <button type="button" className="form-toggle" onClick={() => setIsLogin(true)}>Har du redan ett konto? Logga in</button>
        </form>
      )}
    </div>
  );
};
