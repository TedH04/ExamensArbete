import React, { useState, useContext, useEffect } from 'react';
import "./styling/account.css";
import { UserContext } from '../contexts/UserContext';
import { UserPage } from './userPage';

export const Account = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [retypePassword, setRetypePassword] = useState('');
    const { currentUser, login, register, logout  } = useContext(UserContext);

  useEffect(() => {
    if (currentUser && currentUser.name) {
        setName(currentUser.name);
    }
  }, [currentUser]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(loginEmail, loginPassword);
      //alert("Login successful!");
      //alert(name + " is logged in");
        window.location.reload();
      // If you have redirect logic, it should go here
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
      // Call the register function from context
      await register(name, email, password);
      // Handle successful registration
      alert("Registration successful!");
      setIsLogin(true); // Switch to login form after successful registration
    } catch (error) {
      // Handle registration error
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
        // Login Form
        <form className="account-form" onSubmit={handleLogin}>
        <h2 className="form-title">Login</h2>
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
        <button type="submit" className="form-button">Login</button>
        <button type="button" className="form-toggle" onClick={() => setIsLogin(false)}>Need an account? Register</button>
      </form>
      ) : (
        <form className="account-form" onSubmit={handleRegister}>
          <h2 className="form-title">Register</h2>
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
          <button type="submit" className="form-button">Register</button>
          <button type="button" className="form-toggle" onClick={() => setIsLogin(true)}>Already have an account? Login</button>
        </form>
      )}
    </div>
  );
};
