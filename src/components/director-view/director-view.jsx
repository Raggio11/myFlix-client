import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';


import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './director-view.scss';


export class DirectorView extends React.Component {

  constructor() {
    super();

    this.state = {};
  }



  render() {
    const { director } = this.props;

    if (!director) return <div className='main-view' />;

    return (
      <div className='director-view'>
        <Card style={{ width: '45 rem' }} className='director-card'>
          <Card.Body>
            <Card.Title className='director-name'>{director.Name}</Card.Title>
            <Card.Text>Born: {director.Birth}</Card.Text>
            <Card.Text>Died: {director.Death}</Card.Text>
            <Card.Text>Bio: {director.Bio}</Card.Text>
          </Card.Body>
          <Link to={'/'}>
            <Button variant='link' className='director-backbutton'>Go Back</Button>
          </Link>
        </Card>
      </div>
    )
  }
}
