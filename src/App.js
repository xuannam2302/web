import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router, Switch, Route
} from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { getInformation, refreshToken, logout } from './actions/auth';

import Header from './components/Header';
import Container from './components/Container';
import LandingPage from './components/LandingPage';

import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Profile from './components/Profile';

import About from './components/About';
import Footer from './components/Footer';
import Error from './components/Error';
import CreateItem from './components/CreateItem';

import LuckyDraw from './components/Promotion/LuckyDraw';
import UserWheel from './components/Promotion/UserWheel';
import FireWork from './components/Promotion/FireWork';

import Admin from './components/Admin/Admin';
import Cart from './components/Cart/Cart';
import CartCheckout from './components/Cart/CartCheckout';
import { RESET_QUANTITY } from './constants/actionType';

import io from 'socket.io-client' //

function App() {
  const [socket, setSocket] = useState(null);
  const dispatch = useDispatch();
  const message = useSelector(state => state.message);  
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('token-verify'));
    if (token) {
      dispatch(getInformation(token.token));
      
      if (message.msg === 'Token is expired') {
        console.log("Start refresh_token");
        dispatch(refreshToken(token.id, token.refresh_token));
      }
      if (message.msg === 'Invalid refresh token') {
        dispatch(logout());
        dispatch({ type: RESET_QUANTITY });
      }
    }
  }, [dispatch, message]);

  useEffect(() => {
    let socket = io.connect('http://localhost:5000', { transports: ['websocket', 'polling', 'flashsocket'] });
    setSocket(socket);
    return() => socket.close();
  },[])

  return (
    <Router>
      <div className="App">
        <div className="wrapper">
          <Header />
          <Switch>
            <Route path="/promotion/firework">
              <FireWork />
            </Route>
            <Route path="/promotion/luckydraw">
              <LuckyDraw />
            </Route>
            <Route path="/promotion/wheel">
              <UserWheel />
            </Route>
            <Route path="/cart/checkout">
              <CartCheckout />
            </Route>
            <Route path="/cart">
              <Cart />
            </Route>
            <Route path="/admin/create">
              <CreateItem />
            </Route>
            <Route path="/admin">
              <Admin />
            </Route>
            <Route path="/auth/login">
              <Login />
            </Route>
            <Route path="/auth/register">
              <Register />
            </Route>
            <Route path="/user/profile">
              <Profile />
            </Route>
            <Route path="/book/:_id">
              <LandingPage socket={socket}/>
            </Route>
            <Route exact path='/' component={Container} />
            <Route path='/about' component={About} />
            <Route path="*" component={Error} />
          </Switch>
          <Footer />
        </div>
      </div>
    </Router>
  )
}
export default App;