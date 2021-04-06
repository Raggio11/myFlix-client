import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';


import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './genre-view.scss';


export class GenreView extends React.Component {

  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { genre } = this.props;

    if (!genre) return <div className='main-view' />;

    return (
      <div className='genre-view'>
        <Card style={{ width: '45 rem' }} className='genre-card'>
          <Card.Body>
            <Card.Title className='genre-name'>{genre.Name}</Card.Title>
            <Card.Text>{genre.Description}</Card.Text>
          </Card.Body>
          <Link to={'/'}>
            <Button variant='link' className='genreview-back-button'>Go Back</Button>
          </Link>
        </Card>
      </div>
    )
  }
}

GenreView.propTypes = {
  Genre: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired
  })
} 