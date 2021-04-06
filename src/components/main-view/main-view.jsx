import React from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';


import { Button } from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import './main-view.scss';


export class MainView extends React.Component {

  constructor() {
    super();

    this.state = {
      movies: [],
      user: null
      
    };
  }

  getMovies(token) {
    axios.get('https://peaceful-ocean-31920.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        this.setState({
          movies: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.username
    })

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.username);
    this.getMovies(authData.token);
  }

  onLogOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.open('/', '_self');
  }

  render() {
    // If the state isn't initialized, this will throw on runtime
    // before the data is initially loaded
    const { movies, user } = this.state;

    // Before the movies have been loaded
    if (!movies) return <div className="main-view" />;

    return (
      <Router>
        <div className="main-view">
          <Container className="container">
            <Navbar collapseOnSelect expand="lg" className="fixed-top navbar-main">
              <Navbar.Brand as={Link} to="/" className="brand-myflix">MyFlix!</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                  <Nav.Link as={Link} to="/" className="navbar-link">Home</Nav.Link>
                  <Nav.Link as={Link} to="/users/:username" className="navbar-link">Profile</Nav.Link>
                </Nav>
                <button onClick={this.onLogOut} variant="dark" type="submit" className="button logout-button">Log Out</button>
              </Navbar.Collapse>
            </Navbar>
          </Container>

          <Row>
            <Route exact path="/" render={() => {
              if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
              return movies.map(m => 
                <Col key={m._id} className="card-column d-flex justify-content-around">
                  <MovieCard key={m._id} movie={m} />
                </Col>
              )
            }} />
          </Row>
          
          <Route exact path="/register" render={() => <RegistrationView />} />

          <Route exact path="/movies/:movieId" render={({ match }) =>
            <MovieView movie={movies.find(m => m._id === match.params.movieId)} />} />



          <Route path="/logout" render={() => <LoginView />} />
        </div>
      </Router >
      
    );
  }
}
