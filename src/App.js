import React, { Component } from 'react';
import Form from './Form';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
//import './App.css';

class App extends Component {
  render() {
    return (
      <section class="section">
        <div class="container is-fluid">
          <h1 class="title">
            Tracker Calculator
          </h1>
        </div>
        <Router>
          <div className="container">
            <nav className="navbar" role="navigation" aria-label="main navigation">
              <div className="navbar-menu">
                <div className="navbar-start">
                  <div className="navbar-item">
                  <Link to="/granular" className="navbar-item">Granular utilities</Link>
                  </div>
                  <div className="navbar-item">
                  <Link to="/" className="navbar-item">Home</Link>
                  </div>
                  <div className="navbar-item">
                  <Link to="/about" className="navbar-item">About</Link>
                  </div>
                </div>
              </div>
            </nav>
            {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
            <Switch>
              <Route path="/about">
                <About/>
              </Route>
              <Route path="/granular">
                <Form />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </div>
        </Router>
      </section>
    );
  }
}

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}


export default App;
