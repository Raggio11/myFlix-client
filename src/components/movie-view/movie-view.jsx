import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './movie-view.scss'
import Button from 'react-bootstrap/Button';

export class MovieView extends React.Component {

  constructor() {
    super();

    this.state = {};
  }

  addToFavoriteMovies(movie) {
    const token = localStorage.getItem('token');
    const userid = localStorage.getItem('user');
    axios.put(`https://peaceful-ocean-31920.herokuapp.com/users/${userid}/Movies/${movie._id}`,
      { username: localStorage.getItem('user') },
      {
        headers: { Authorization: `Bearer ${token}` },
      }).then((res) => {
        console.log(res);
        alert('This movie has been added to your Favorites.');
      });
  }


  render() {
    const { movie, onClick } = this.props;

    if (!movie) return null;

    return (<div>
      <div className="movie-view">
        <section className="movie-poster-section">
          <img className="movie-poster" src={movie.ImagePath} />
          <div className="movie-poster-buttons">
            <Button onClick={() => this.addToFavoriteMovies(movie)} className="button-add-favorite" style={{ background: 'green' }}>Add to Favorite Movies</Button>
          </div>
        </section>
        <div className="movie-title">
          <span className="label">Title: </span>
          <span className="value">{movie.Title}</span>
        </div>
        <div className="movie-description">
          <span className="label">Description: </span>
          <span className="value">{movie.Description}</span>
        </div>
        <div className="movie-genre">
          <span className="label">Genre: </span>
          <span className="value">{movie.Genre.Name}</span>
        </div>
        <div className="movie-director">
          <span className="label">Director: </span>
          <span className="value">{movie.Director.Name}</span>
        </div>
      </div>
      </div>
    );
  }
} 


MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.string.isRequired,
      Death: PropTypes.string
    }),
  })
}