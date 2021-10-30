import React, { useState, useEffect } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import AuthContext from './store/auth-context';
import MainHeader from './components/MainHeader/MainHeader';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const localStorageData = localStorage.getItem('loggedIn');

  useEffect(() => {
    if(localStorageData === '1'){
      setIsLoggedIn(true);
    }
  }, [])


  const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    // localStorage.setItem('loggedIn', '1');
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    setIsLoggedIn(false);
    // localStorage.setItem('loggedIn');
  };

  return (
    <AuthContext.Provider value={
      {isLoggedIn: isLoggedIn,
        onlogoutHandler: logoutHandler,
        onloginHandler: loginHandler
      }}>
      <MainHeader />
      <main>
        {!isLoggedIn && <Login/>}
        {isLoggedIn && <Home/>}
      </main>
    </AuthContext.Provider>
  );
}

export default App;
