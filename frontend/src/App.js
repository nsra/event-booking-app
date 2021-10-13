import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Navbar from './components/Navbar';
import AuthPage from './pages/Auth';
import EventsPage from './pages/Events';
import BookingsPage from './pages/Bookings';
import ErrorPage from './pages/Error'
import AuthContext from './context/auth-context';

function App() {
  let [token, setToken] = useState(null);
  let [userId, setUserId] = useState(null);

  useEffect(() => {
    if (localStorage.getItem('token') && localStorage.getItem('userId')) {
      setToken(localStorage.getItem('token'));
      setUserId(localStorage.getItem('userId'));
    }
  }, [token]);

  const login = (userToken, loginUserId) => {
    setToken(userToken);
    setUserId(loginUserId);
    localStorage.setItem("token", userToken);
    localStorage.setItem("userId", loginUserId);
  };

  const logout = () => {
    setToken(null);
    setUserId(null);
    localStorage.clear();
  };

  return (
    <BrowserRouter>
      <React.Fragment>
        <AuthContext.Provider value={{ token, userId, login, logout }}>
          <Navbar />
          <main className="main-content">
            <Switch>
              {token && <Redirect from='/' to='/events' exact />}
              {!token && <Route path='/auth' component={AuthPage} />}
              {!token && <Route path='/error' component={ErrorPage} />}
              {token && <Redirect from='/auth' to='/events' exact />}
              <Route path='/events' component={EventsPage} />
              {token && <Route path='/bookings' component={BookingsPage} />}
              {!localStorage.getItem('token') && <Redirect from='/bookings' to='/auth' exact />}
            </Switch>
          </main>
        </AuthContext.Provider>
      </React.Fragment>
    </BrowserRouter>
  );
}

export default App;

