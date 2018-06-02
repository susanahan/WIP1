import React, {Component} from 'react';
import {Link} from "react-router-dom";
import TextLoop from 'react-text-loop';
import {Jumbotron, Button} from 'react-bootstrap';
import '../styles/Homepg.css';
import '../styles/index.css';

let divStyle = {
    color: "#d79922"
  };

  class Welcome extends Component {
    constructor(props) {
      super(props);
      this.state = {
        loginError: false,
        redirect: false
      };
  
    }
  
    render() {
    
  
      return (
        <div className='flex-container'>
            
          <Jumbotron bsClass='jumboCustom'>
  
            <p id='WelcomeText'>
              Hello {""}
              <TextLoop
                mask={true}
                children={["Creator!", "Visionarer!", "Artist!"]}
                speed={4000} 
                style={divStyle}>
              
              </TextLoop>
            </p>
  
            <p>
            We get it. You want products that make you feel your best without 
            devoting your life to finding them. That’s why we created Birchbox.
            </p>
            <p>
            <Link to="/user/questions">
                <Button bsStyle="primary">
                Get Started
                </Button>
            </Link>
            </p>
  
          </Jumbotron>
  
        </div>
  
      );
    }
  }
  
  export default Welcome;