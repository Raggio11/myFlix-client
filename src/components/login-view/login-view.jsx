import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './login-view.scss';

import { Link } from 'react-router-dom';
export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Allows login with random credentials for existing user, no functionality for new users yet
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://peaceful-ocean-31920.herokuapp.com/login', {
      username: username,
      password: password
    })
      .then(response => {
        const data = response.data;
        props.onLoggedIn(data);
      })
      .catch(e => {
        console.log('no such user')
      });
  };
  

  return (
    <div className="login-view">
      <br/> <br/>
      <h2>Welcome to myFlix!</h2>

      <Form className="login-form">
        <Form.Group controlId="formBasicUsername" className="login-item m-auto">
          <Form.Label>Username: </Form.Label>
          <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Enter Username" />
        </Form.Group>

        <Form.Group controlId="formBasicPassword" className="login-item m-auto">
          <Form.Label>Password: </Form.Label>
          <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter Password" />
        </Form.Group>

        {/* <Form.Group controlId="formBasicCheckbox" className="login-item m-auto">
          <Form.Check type="checkbox" label="Check if you are ready to enter myFlix" />
        </Form.Group> */}
      </Form>
      <div className="login-buttons">
        <Button onClick={handleSubmit} variant="primary" type="submit" className="button-login mx-auto">Login</Button>
        <Link to={"/register"}>
          <Button variant="success" className="button-register ml-1">Register</Button>
        </Link>
      </div>



    </div>
  );
}

LoginView.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
  }),
  onLoggedIn: PropTypes.func.isRequired,
};