import React, { useEffect } from 'react'
import {
  BrowserRouter as Router, Switch, Route
} from "react-router-dom";

import { useDispatch } from 'react-redux'
import { getBooks } from './actions/books'

import Header from './components/Header'
import Container from './components/Container'
import About from './components/About'
import Footer from './components/Footer'
import Error from './components/Error'

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBooks());
  }, [dispatch]);
  return (
    <Router>
      <div className="App">
        <div className="wrapper">
          <Header />
          <Switch>
            <Route exact path = '/' component={Container}/>
            <Route path = '/about' component={About} />
            <Route path="*" component={Error} />
          </Switch>
          <Footer />
        </div>
      </div>
    </Router>
  )
}
export default App;