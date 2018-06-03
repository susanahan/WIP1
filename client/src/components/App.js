import React, { Component } from 'react';
import {Route, Link} from "react-router-dom";
import Welcome from "./Home/Welcome";
import Particles from 'react-particles-js';
import Users from './Users/Users';
import QuestionsForm from './Questions/Questions';
import HeaderNav from "./Nav/Header";
import FooterNav from "./Nav/Footer";
import './styles/sticky-footer.css';

class App extends Component {
  render() {
    return (
      <div>
          <Particles
          params={{
          particles: {
            number: {
              value: 50
            },
            line_linked: {
              shadow: {
                enable: true,
                color: "#F13C20",
                blur: 1
              }
            }
          }
        }}
          style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: -1,
          width: "200%",
          height: "100%"
        }} /> 
        
        <HeaderNav />
        <p>My React App!</p>

        <Route exact path="/" component={Welcome} />
        <Route path="/users" component={Users} />
        <Route exact path="/user/questions" component={QuestionsForm} />
        <FooterNav />
      </div>
    );
  }
}

export default App;
