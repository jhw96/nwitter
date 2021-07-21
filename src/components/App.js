import AppRouter from './Router';
import React, { useEffect, useState } from 'react';

import { authService } from '../fbase';

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);

  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) => user.updateProfile(args),
    });
  };

  useEffect(() => {
    // React Hook으로써, mount될때 실행되는 함수
    authService.onAuthStateChanged((user) => {
      // Firebase.Auth의 유저의 상태변화 리스너
      if (user) {
        setIsLoggedIn(true);
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) => user.updateProfile(args),
        });
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);
  return (
    <>
      {init ? (
        <AppRouter refreshUser={refreshUser} isLoggedIn={isLoggedIn} userObj={userObj} />
      ) : (
        'Initializing...'
      )}
    </>
  );
}

export default App;
