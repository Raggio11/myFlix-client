import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MovieCard from '../movie-card/movie-card';
import FilterInput from '../filter-input/filter-input';

const MoviesList = ({ movies, moviesFilter }) => {
  let filteredMovies = movies;

  if (moviesFilter !== '') {
    filteredMovies = movies.filter((m) => m.Title.includes(moviesFilter));
  }

  return !movies ? (
    <div>Loading Movies</div>
  ) : (
    <div>
      <h2 className='my-1 h3 text-dark text-center'>
        Choose from{' '}
        <span className='text-primary'>{filteredMovies.length}</span> exciting
        movies
      </h2>
      <FilterInput moviesFilter={moviesFilter} />
      <div className='container d-flex flex-wrap justify-content-center'>
        {filteredMovies.map((m) => (
          <MovieCard key={m._id} movie={m} />
        ))}
      </div>
    </div>
  );
};
MoviesList.propTypes = {
  movies: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  movies: state.movies.list,
  moviesFilter: state.movies.moviesFilter,
});

export default connect(mapStateToProps)(MoviesList);