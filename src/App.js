import React, { useEffect } from 'react';
import {
  BrowserRouter as Router, Switch, Route
} from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { getInformation, refreshToken } from './actions/auth';

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

import Admin from './components/Admin/Admin';

function App() {

  const dispatch = useDispatch();
  const message = useSelector(state => state.message);
  
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('token-verify'));
    // console.log(token);
    if (token) {
      dispatch(getInformation(token.token));
    }
  });
  
  
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('token-verify'));
    console.log("message", message);
    if(message && token) {
      if(message.msg === 'Token is expired') {
        dispatch(refreshToken(token.id, token.refresh_token));
      }
    }
  }, [dispatch, message]);


  return (
    <Router>
      <div className="App">
        <div className="wrapper">
          <Header />
          <Switch>
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
              <LandingPage />
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