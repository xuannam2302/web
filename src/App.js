import React from 'react'
import {
  BrowserRouter as Router, Switch, Route
} from "react-router-dom";

import Header from './components/Header'
import Container from './components/Container'
import LandingPage from './components/LandingPage'
import EditItem from './components/EditItem'
import CreateItem from './components/CreateItem'
import Login from './components/Login'
import Register from './components/Register'
import About from './components/About'
import Footer from './components/Footer'
import Error from './components/Error'

function App() {
  return (
    <Router>
      <div className="App">
        <div className="wrapper">
          <Header />
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/book/create">
              <CreateItem />
            </Route>
            <Route path="/book/:_id/edit">
              <EditItem />
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