import React from "react";
import axios from "axios";
import {Redirect} from "react-router";
import GoogleLogin from 'react-google-login';
import {Button, Form, FormGroup, FormControl, Col} from 'react-bootstrap';

class LoginUser extends React.Component {
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
        const {usernameInput, passwordInput} = this.state;

        axios
            .post("/users/signin", {
            username: usernameInput,
            password: passwordInput
        })
            .then(res => {
                this
                    .props
                    .setUser(res.data);
                this
                    .props
                    .toggleLogin();
                this.setState({usernameInput: "", passwordInput: "", message: "Login Success"})
            })
            .catch(err => {
                this.setState({usernameInput: "", passwordInput: "", message: "username/password not found"});
            });
    };

    logout = () => {
        axios
            .post('/users/logout')
            .then((res) => {
                this
                    .props
                    .removeUser();
                this
                    .props
                    .toggleLogin();
                this.setState({usernameInput: "", passwordInput: "", message: res.data})
            })
            .catch((res) => {
                this.setState({message: "Please log in first."})
            })
    }

    render() {
        const {usernameInput, passwordInput, message} = this.state;

        const responseGoogleLogin = (response) => {
            let obj = {
                profileObj: response.profileObj,
                tokenObj: response.tokenObj
            }
            console.log('google obj: ', obj);

            axios
                .post(`/users/auth/google/callback/login`, obj)
                .then((response) => {
                    console.log(' data ==> ', response);
                })
                .catch((err) => {
                    console.log(err)
                });
        };

        if (!this.props.user) {
            console.log('this.usernameInput', this.setState.usernameInput)
            return (
                <div className='loginBox'>
                    <h1>
                        Log In
                    </h1>
                    <a
                        style={{
                        color: "red"
                    }}
                        onClick={this.logout}>
                        Log Out
                    </a>
                    <br/>
                    <GoogleLogin
                        clientId='1058685021114-0na9baq82q17hon6709ct8gine9vsk2s.apps.googleusercontent.com'
                        buttonText='Login with Google'
                        onSuccess={responseGoogleLogin}
                        onFailure={responseGoogleLogin}/>
                    <br/>
                    <span className="omb_spanOr">or</span>

                    <Form horizontal id='form_users' onChange={this.formChanging}>
                        <FormGroup controlId="name">
                            <Col sm={8}>
                                <FormControl
                                    onChange={this.handleUsernameChange}
                                    value={usernameInput}
                                    type="name"
                                    placeholder="Username"/>

                            </Col>
                        </FormGroup>

                        <FormGroup controlId="formHorizontalPassword">

                            <Col sm={8}>
                                <FormControl
                                    onChange={this.handlePasswordChange}
                                    value={passwordInput}
                                    type="password"
                                    placeholder="Password"/>
                            </Col>
                        </FormGroup>

                        <FormGroup>
                            <Col sm={8}>
                                <Button onClick={this.submitForm} bsStyle="primary" block type="submit">Submit</Button>
                            </Col>
                        </FormGroup>
                    </Form>

                    <p>{message}</p>
                </div>
            )
        } else {
            return (
                <div>
                    <br></br>

                    <a
                        style={{
                        color: "red"
                    }}
                        onClick={this.logout}>
                        Log Out
                    </a>

                    <br></br>

                    Welcome, {this.props.user}!

                    <br></br>

                    {this.props.message}
                </div>
            )
        }
    }

}
export default LoginUser