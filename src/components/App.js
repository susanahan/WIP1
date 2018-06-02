import React, { Component } from 'react';
import {Route, Link} from "react-router-dom";
import Welcome from "./Home/Welcome";
import Particles from 'react-particles-js';
// import Users from './components/Users/Users';
// import QuestionsForm from './components/Questions/Questions';
import HeaderNav from "./Nav/Header";

import FooterNav from "./Nav/Footer";
import './styles/sticky-footer.css';

class App extends Component {
  render() {
    return (
      <div>
        <HeaderNav />
        <p>My React App!</p>

        <Route exact path="/" component={Welcome} />
        <Route path="/users" component={""} />
        <Route exact path="/user/questions" component={""} />
        <FooterNav />
      </div>
    );
  }
}

export default App;
