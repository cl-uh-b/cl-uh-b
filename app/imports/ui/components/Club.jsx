import React from 'react';
import { Card } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

class Club extends React.Component {
  render() {
    return (
        <Card centered>
          <Card.Content>
            <Card.Header>{this.props.club.name}</Card.Header>
            <Card.Meta>{this.props.club.type}</Card.Meta>
            <Card.Description></Card.Description>
            <Card.Meta>Contact: {this.props.club.contact}</Card.Meta>
            <Card.Meta>Email: {this.props.club.email}</Card.Meta>
          </Card.Content>
        </Card>
    );
  }
}

Club.propTypes = {
  club: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(Club);
