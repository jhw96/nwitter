import { authService, firebaseInstance } from 'fbase';
import React, { useState } from 'react';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState('');

  const onchange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      if (newAccount) {
        // Create a new account
        await authService.createUserWithEmailAndPassword(email, password);
      } else {
        // Login
        await authService.signInWithEmailAndPassword(email, password);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const toggleAccount = () => {
    setNewAccount(!newAccount);
  };

  const onSocialClick = async (event) => {
    const {
      target: { name },
    } = event;
    let provider;
    if (name === 'google') {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    } else if (name === 'github') {
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }
    await authService.signInWithPopup(provider);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          name="email"
          type="text"
          placeholder="Email"
          required
          value={email}
          onChange={onchange}
        ></input>
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={onchange}
        ></input>
        <input type="submit" value={newAccount ? 'Create Account' : 'Log In'}></input>
        {error}
      </form>
      <span onClick={toggleAccount}>
        {newAccount ? <button>Create Account</button> : <button>Log In</button>}
      </span>
      <div>
        <button name="google" onClick={onSocialClick}>
          Continue with Google
        </button>
        <button name="github" onClick={onSocialClick}>
          Continue with Github
        </button>
      </div>
    </div>
  );
};
export default Auth;
