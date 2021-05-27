import React, { useState } from 'react'
import {
  BrowserRouter as Router, Switch, Route
} from "react-router-dom";

import Header from './components/Header'
import Container from './components/Container'
import LandingPage from './components/LandingPage'
import Login from './components/Login'
import Register from './components/Register'
import About from './components/About'
import Footer from './components/Footer'
import Error from './components/Error'
import CreateItem from './components/CreateItem'

import Admin from './components/Admin/Admin'
import AdminHeader from './components/Admin/AdminHeader'

function App() {
  const [admin, setAdmin] = useState(false);

  if (admin) {
    return (
      <Router>
        <div className="App">
          <div className="wrapper">
            <AdminHeader setAdmin={setAdmin}/>
            <Switch>
              <Route path="/admin/create">
                <CreateItem />
              </Route>
              <Route path="/admin">
                <Admin />
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    )
  }
  return (
    <Router>
      <div className="App">
        <div className="wrapper">
          <Header setAdmin={setAdmin}/>
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/register">
              <Register />
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

// last_modified