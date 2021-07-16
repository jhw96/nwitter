import { authService } from 'fbase';
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
        <button>Continue with Google</button>
        <button>Continue with Github</button>
      </div>
    </div>
  );
};
export default Auth;
