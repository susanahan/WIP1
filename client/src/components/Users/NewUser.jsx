import React from "react";
import axios from "axios";
import GoogleLogin from 'react-google-login';

import {Button, Form, FormGroup, FormControl, Col} from 'react-bootstrap';

class NewUser extends React.Component {
  constructor() {
    super();
    this.state = {
      usernameInput: "",
      passwordInput: "",
      message: ""
    }
  }

  handleUsernameChange = e => {
    this.setState({usernameInput: e.target.value});
  };

  handlePasswordChange = e => {
    this.setState({passwordInput: e.target.value});
  };

  submitForm = e => {
    e.preventDefault()
    const {usernameInput, passwordInput} = this.state;

    axios
      .post('/users/signup', {
      username: usernameInput,
      password: passwordInput
    })
      .then(res => {
        this.setState({usernameInput: "", passwordInput: "", message: "Registered User"});
      })
      .catch(err => {
        console.log("error: ", err);
        this.setState({usernameInput: "", passwordInput: "", message: "Error registering user"});
      });
  };

  render() {
    const {usernameInput, passwordInput, message} = this.state;
    
    const responseGoogleSignUp = (response) => {
      let obj = {
        profileObj: response.profileObj,
        tokenObj: response.tokenObj
      }
      console.log('google obj: ', obj);
      
      axios.post(`/users/auth/google/callback/signup`, obj)
      .then((response) => {
        console.log(' data ==> ', response);
      })
      .catch((err) => {
        console.log(err)
  
      });
    };

    return (
      <div className='loginBox'>
      <h1> Sign Up </h1>
      <div className="google-btn">
        <GoogleLogin
              clientId='1058685021114-0na9baq82q17hon6709ct8gine9vsk2s.apps.googleusercontent.com'
              buttonText='Sign up with Google'
              onSuccess={responseGoogleSignUp}
              onFailure={responseGoogleSignUp}/>
              </div>
              <span className="omb_spanOr">or</span>

        <Form horizontal id='form_users' onSubmit={this.submitForm}>
          <FormGroup controlId="name">

            <Col sm={8}>
              <FormControl
                onChange={this.handleUsernameChange}
                value={usernameInput}
                type="name"
                placeholder="Pick a username"/>

            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalPassword">

            <Col sm={8}>
              <FormControl
                onChange={this.handlePasswordChange}
                value={passwordInput}
                type="password"
                placeholder="Create a password"/>
            </Col>
          </FormGroup>

          <FormGroup>
            <Col sm={8}>
              <Button bsStyle="primary" block type="submit">Create my free account</Button>
            </Col>
          </FormGroup>
        </Form>
        <p>{message}</p>
      </div>
    )
  }
}

export default NewUser;