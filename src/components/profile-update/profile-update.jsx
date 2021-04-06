import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import './profile-update.scss';

export function ProfileUpdate(props) {
  const [username, updateUsername] = useState('');
  const [password, updatePassword] = useState('');
  const [email, updateEmail] = useState('');
  const [birthdate, updateBirthdate] = useState('');

  const [usernameErr, setUsernameErr] = useState({});
  const [passwordErr, setPasswordErr] = useState({});
  const [emailErr, setEmailErr] = useState({});
  // const [birthdateErr, setBirthdateErr] = useState({});

  const handleUpdate = (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('user');

    const isValid = formValidation();

    if (isValid) {
      axios.put(`https://peaceful-ocean-31920.herokuapp.com/users/${userId}`,
        {
          username: username,
          password: password,
          email: email,
          Birthdate: birthdate
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
        .then((res) => {
          const data = res.data;
          localStorage.setItem('user', data.Username);
          alert('Your profile was successfully updated.');
          window.open('/users/:userId', '_self');
        })
        .catch((e) => {
          console.log('error registering user');
          alert('There was an error updating your profile. Please make sure all fields are completed with accurate information.');
        });
    }
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
      passwordErr.passwordMissing = 'You must enter a password';
      isValid = false;
    }

    if (!email.includes('.') && !email.includes('@')) {
      emailErr.emailNotEmail = 'A valid email address is required';
      isValid = false;
    }

    setUsernameErr(usernameErr);
    setPasswordErr(passwordErr);
    setEmailErr(emailErr);
    return isValid;

  }

  return (
    <div className="profile-update">
      <h3>Update Your Profile</h3>

      <Form className="update-form">
        <Form.Group controlId="formBasicUsername" className="update-item">
          <Form.Label>Username: </Form.Label>
          <Form.Control type="text" value={username} placeholder="Update Username" onChange={e => updateUsername(e.target.value)} />
          {/* <Form.Text className="text-muted">Must be alphanumberic and have a minimum of 5 characters.</Form.Text> */}
          {Object.keys(usernameErr).map((key) => {
            return <div key={key} style={{ color: 'red' }}>{usernameErr[key]}</div>
          })}
        </Form.Group>

        <Form.Group controlId="formBasicPassword" className="update-item">
          <Form.Label>Update Password: </Form.Label>
          <Form.Control type="password" value={password} placeholder="Update Password" onChange={e => updatePassword(e.target.value)} />
          {/* <Form.Text className="text-muted">Suggested that password have at least 8 characters.</Form.Text> */}
          {Object.keys(passwordErr).map((key) => {
            return <div key={key} style={{ color: 'red' }}>{passwordErr[key]}</div>
          })}
        </Form.Group>

        <Form.Group controlId="formBasicEmail" className="update-item">
          <Form.Label>Email Address: </Form.Label>
          <Form.Control type="email" placeholder="Update Email" value={email} onChange={e => updateEmail(e.target.value)} />
          {Object.keys(emailErr).map((key) => {
            return <div key={key} style={{ color: 'red' }}>{emailErr[key]}</div>
          })}
        </Form.Group>

        <Form.Group controlId="formBasicBirthdate" className="update-item">
          <Form.Label>Date of Birth: </Form.Label>
          <Form.Control type="date" placeholder="YYYY-MM-DD" value={birthdate} onChange={e => updateBirthdate(e.target.value)} />
        </Form.Group>
        <div className="btns-update">
        <Button type="submit" className="button-update-profile" variant='success' onClick={handleUpdate}>Submit</Button>
        <Link to={"/users/:userId"}>
          <Button className="button-cancel">Cancel</Button>
        </Link>
      </div>
      </Form>

    </div>
  );
}


ProfileUpdate.propTypes = {
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthdate: PropTypes.instanceOf(Date).isRequired
  })
}