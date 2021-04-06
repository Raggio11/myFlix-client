import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './registration-view.scss';
import axios from 'axios';
import { Link } from 'react-router-dom';

export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthdate, setBirthdate] = useState('');

  const [usernameErr, setUsernameErr] = useState({});
  const [passwordErr, setPasswordErr] = useState({});
  const [emailErr, setEmailErr] = useState({});
  // const [birthdateErr, setBirthdateErr] = useState({});


  const handleRegister = (e) => {
    e.preventDefault();
    const isValid = formValidation();

    if (isValid) {
      axios.post('https://peaceful-ocean-31920.herokuapp.com/users', {
        username: username,
        password: password,
        email: email,
        Birthdate: birthdate
      })
        .then(response => {
          const data = response.data;
          console.log(data);
          alert('You are now registered and may login')
          window.open('/', '_self');
        })
        .catch(e => {
          console.log('error registering user')
          alert('Please make sure you enter accurate information')
        });
    };
  }
  const formValidation = () => {
    const usernameErr = {};
    const passwordErr = {};
    const emailErr = {};
    const birthdateErr = {};
    let isValid = true;

    if (username.trim().length < 5) {
      usernameErr.usernameShort = 'Username must be at least 5 characters';
      isValid = false;
    }

    if (password.trim().length < 1) {
      passwordErr.passwordMissing = 'A password is required for registration';
      isValid = false;
    }

    // if (email.trim().length < 1) {
    //   emailErr.emailMissing = 'An email address is required for registration';
    //   isValid = false;
    // }

    if (!email.includes('.') && !email.includes('@')) {
      emailErr.emailNotEmail = 'A valid email address is required for registration';
      isValid = false;
    }

    setUsernameErr(usernameErr);
    setPasswordErr(passwordErr);
    setEmailErr(emailErr);
    return isValid;

  }

  return (
    <div className="registration-view">
      <Form className="registration-form">
      <h3>Register as a New MyFlix User</h3>
        <Form.Group controlId="formBasicUsername" className="registration-item">
          <Form.Label>Create Username: </Form.Label>
          <Form.Control type="text" value={username} placeholder="Username" onChange={e => setUsername(e.target.value)} />
          {Object.keys(usernameErr).map((key) => {
            return <div key={key} style={{ color: 'red' }}>{usernameErr[key]}</div>
          })}
        </Form.Group>

        <Form.Group controlId="formBasicPassword" className="registration-item">
          <Form.Label>Create Password: </Form.Label>
          <Form.Control type="password" value={password} placeholder="Password" onChange={e => setPassword(e.target.value)} />
          {Object.keys(passwordErr).map((key) => {
            return <div key={key} style={{ color: 'red' }}>{passwordErr[key]}</div>
          })}
        </Form.Group>

        <Form.Group controlId="formBasicEmail" className="registration-item">
          <Form.Label>Enter Email Address: </Form.Label>
          <Form.Control type="email" placeholder="Email Address" value={email} onChange={e => setEmail(e.target.value)} />
          {Object.keys(emailErr).map((key) => {
            return <div key={key} style={{ color: 'red' }}>{emailErr[key]}</div>
          })}
        </Form.Group>

        <Form.Group controlId="formBasicBirthdate" className="registration-item">
          <Form.Label>Enter Date of Birth: </Form.Label>
          <Form.Control type="date" placeholder="YYYY-MM-DD" value={birthdate} onChange={e => setBirthdate(e.target.value)} />
          </Form.Group>
              <div className="buttons-logreg">
            <Link to={"/"}>
                <Button className="button-to-login">Login</Button>
              </Link>
              <Button type="submit" variant="success" className="button-registration" onClick={handleRegister}>Register</Button>
            </div>
            </Form>
          </div>
        );
      }

RegistrationView.propTypes = {
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthdate: PropTypes.instanceOf(Date).isRequired
  })
}
