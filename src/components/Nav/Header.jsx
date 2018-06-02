import React from "react";
import {Link} from "react-router-dom";
import '../styles/sticky-footer.css';

import {
    // Button,
    Nav,
    Navbar,
    NavItem
  } from 'react-bootstrap';

  const HeaderNav = ()=>{
    return (
      <div>
     <Navbar className='navbar-fixed-top'>
         <Navbar.Brand>
         <a className="navbar-brand" componentClass={Link} href="/" to="/">
            <img alt='logo' src="/public/logo.png" width="80px" height="70px"/>
        </a>
        </Navbar.Brand>

    <Nav bsStyle="tabs" activeKey="1">
        <NavItem eventKey={1} componentClass={Link} href="/" to="/posts">Posts</NavItem>
    </Nav>

    <Nav pullRight>
        <NavItem
            eventKey={1}
            bsStyle="pills"
            componentClass={Link}
            href="/"
            to="/users/login">Login</NavItem>
        
        <NavItem eventKey={2} componentClass={Link} href="/" to="/users/register">Register</NavItem>
     </Nav>
     </Navbar>
    </div>
    )
  }

export default HeaderNav;
