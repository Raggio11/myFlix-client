import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';


import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import './profile-view.scss';


export class ProfileView extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      Username: null,
      Password: null,
      Email: null,
      Birthdate: null,
      FavoriteMovies: [],
      movies: []
    };
  }

  getUser(token) {
    const userId = localStorage.getItem('user');

    axios.get(`https://peaceful-ocean-31920.herokuapp.com/users/${userId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => {
        this.setState({
          username: res.data.username,
          password: res.data.password,
          email: res.data.email,
          Birthdate: res.data.Birthdate,
          FavoriteMovies: res.data.FavoriteMovies
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.open('/', '_self');
  }

  componentDidMount() {
    const accessToken = localStorage.getItem('token');
    this.getUser(accessToken);
  }

  deleteUser() {
    if (!confirm('Do you really want to delete your profile?')) return;
    axios.delete(`https://peaceful-ocean-31920.herokuapp.com/users/${localStorage.getItem('user')}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then((res) =>
        console.log(res))
    alert('Your profile has been deleted')
    this.onLoggedOut();
  }


  deleteFavoriteMovie(movie) {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('user');

    axios.delete(`https://peaceful-ocean-31920.herokuapp.com/users/${localStorage.getItem('user')}/Movies/${movie._id}`,
        {headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then((res) => {
        console.log(res)
        this.componentDidMount();
      });
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeitem('user');
    window.open('/', '_self');
  }

  render() {
    const { movies } = this.props;
    const userFavoriteMovies = this.state.FavoriteMovies;
    const FavoriteMoviesList = movies.filter((movie) => userFavoriteMovies.includes(movie._id));

    return (
      <Container>
        <Card style={{ width: '50rem' }} className="profile-view">
        <h2 className="profile-title">Profile Page of {this.state.username}</h2>
          <Card.Body>
            <Card.Text className='profile-text'>Username: {this.state.username}</Card.Text>
            <Card.Text className='profile-text'>Email: {this.state.email}</Card.Text>
            <Card.Text className='profile-text'>Birthdate: {this.state.Birthdate}</Card.Text>
            <div className='three-buttons'>
            <Link to={'/users/:userId/update'}>
              <Button className='to-update-profile-button' variant='success' >Update Profile</Button>
            </Link>
            <Button onClick={() => this.deleteUser()} className='to-delete-profile-button' variant='danger'>Delete Profile</Button>
            <Link to={'/'}>
              <Button className='profile-go-back-button'>Go Back</Button>
            </Link>
            </div>
          </Card.Body>
          <h2 className='favorite-movies-title'>Your Favorite Movies</h2>
        </Card>
        <Container>
          
          {FavoriteMoviesList.map((movie) => {
             return (
              <Card key={movie._id} style={{ width: '15rem' }} className="favorite-movies">
                <Card.Img variant='top' src={movie.ImagePath} className="fav-movies-poster" />
                <Card.Body>
                  <Link to={`/movies/${movie._id}`}>
                    <Button variant='link' className='fav-movie-info'>Movie Info</Button>
                  </Link>
                  <Button variant='link' className='fav-movie-remove' onClick={() => this.deleteFavoriteMovie(movie)}>Remove Movie</Button>
                </Card.Body>
              </Card>
            );
          })}
        </Container>
      </Container>
    );
  }
}

ProfileView.propTypes = {
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthdate: PropTypes.instanceOf(Date).isRequired,
    FavoriteMovies: PropTypes.array
  })
}