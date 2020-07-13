import React, { Component } from 'react';
import Form from './Form';
import GrainList from './GrainList';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import 'react-bulma-components/dist/react-bulma-components.min.css';
import { Navbar } from 'react-bulma-components';

//import './App.css';

class App extends Component {

  state = { active : false }

  handleClick = () => {
    const { active } = this.state;
    this.setState({ active: !active });
  }

  render() {
    return (
      <section className="section">
        <div className="container is-fluid">
          <h1 className="title">
            Tracker Calculator
          </h1>
        </div>
        <Router>
          <div className="container">
            <Navbar active={this.state.active}>
              <Navbar.Burger onClick={this.handleClick} />
              <Navbar.Menu >
                <Navbar.Item to="/regular-grain-position" renderAs={Link}>
                  Regular Grain Position
                </Navbar.Item>
                <Navbar.Item to="/grain-list-composer" renderAs={Link}>
                  Grain list Composer
                </Navbar.Item>
              </Navbar.Menu>
            </Navbar>
            {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
            <Switch>
              <Route path="/regular-grain-position">
                <Form />
              </Route>
              <Route path="/grain-list-composer">
                <GrainList />
              </Route>
            </Switch>
          </div>
        </Router>
      </section>
    );
  }
}





export default App;
