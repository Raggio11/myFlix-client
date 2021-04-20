import React from 'react';
import PropTypes from 'prop-types';
import { NavHashLink as NavLink } from 'react-router-hash-link';
import { connect } from 'react-redux';
// Components
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

const NavBar = ({ user, logoutUser }) => {
  // Only renders profile/logout link when user is logged in
  const renderButtons = () => {
    return user === null ? (
      <div></div>
    ) : (
      <div>
        <NavLink to='/profile' smooth>
          <Button className='mr-1'>{user.Username}</Button>
        </NavLink>
        <NavLink exact to='/' smooth>
          <Button
            onClick={logoutUser}
            className='ml-1'
            variant='outline-primary'
          >
            Logout
          </Button>
        </NavLink>
      </div>
    );
  };

  return (
    <Navbar
      bg='white'
      className='d-flex justify-content-between align-items-center px-3'
    >
      <NavLink exact to='/'>
        <Navbar.Brand className='text-dark font-italic h2 font-weight-bold p-0 m-0'>
          my<span className='text-primary'>Fight</span>Flix
        </Navbar.Brand>
      </NavLink>
      <div>{renderButtons()}</div>
    </Navbar>
  );
};

NavBar.propTypes = {
  user: PropTypes.object,
  logoutUser: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  logoutUser: () => dispatch(logoutUser()),
});

const mapStateToProps = (state) => ({
  user: state.user.user,
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);