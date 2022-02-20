import React, { useState } from 'react' 
import './App.css' 
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom' 
import Navbar from './components/Navbar' 
import LoginPage from './pages/Login' 
import EventsPage from './pages/Events' 
import BookingsPage from './pages/Bookings' 
import SignUpPage from './pages/SignUp' 
import AuthContext from './context/auth-context'
import CustomRedirect from './components/PrivateRoute' 

function App() {
  let [token, setToken] = useState(localStorage.getItem('token') || '') 
  let [userId, setUserId] = useState(localStorage.getItem('userId') || '') 
  let [username, setUsername] = useState(localStorage.getItem('username') || '') 

  const login = (userToken, loginUserId, username) => {
    setToken(userToken) 
    setUserId(loginUserId) 
    setUsername(username)
    if(userToken) localStorage.setItem(["token"], userToken) 
    if(loginUserId) localStorage.setItem("userId", loginUserId) 
    if(username) localStorage.setItem("username", username) 
  } 

  const logout = () => {
    setToken(null) 
    setUserId(null) 
    setUsername(null)
    localStorage.clear() 
  } 

  return (
    <BrowserRouter>
      <React.Fragment>
        <AuthContext.Provider value={{ token, userId, username, login, logout }}>
          <Navbar />
          <main className="main-content">
          <Switch>
            {!token && <Route path='/login' component={LoginPage} />}
            {token && <Route path='/bookings' component={BookingsPage} />}
            <Redirect from='/' to='/events' exact />
            <CustomRedirect from='/login' to='/events' />
            <CustomRedirect  from='/signup' to='/events' />
            <Route path='/events' component={EventsPage} />
            <Route path='/signup' component={SignUpPage} />
            <CustomRedirect from='/bookings' to='/login' />
          </Switch>
          </main>
        </AuthContext.Provider>
      </React.Fragment>
    </BrowserRouter>
  ) 
}

export default App 