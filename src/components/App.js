import AppRouter from './Router';
import React, { useEffect, useState } from 'react';

import { authService } from '../fbase';

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    // React Hook으로써, mount될때 실행되는 함수
    authService.onAuthStateChanged((user) => {
      // Firebase.Auth의 유저의 상태변화 리스너
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);
  return (
    <>
      {init ? <AppRouter isLoggedIn={isLoggedIn} /> : 'Initializing...'}
      <footer>&copy; Nwitter {new Date().getFullYear()}</footer>
    </>
  );
}

export default App;
