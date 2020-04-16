import React from 'react';
import { Card, Button, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

class Club extends React.Component {
  render() {
    return (
        <Card centered>
          <Card.Content>
            <Image id="card-image"
                   floated={'right'}
                // size={'mini'}
                   src={this.props.club.image}
            />
            <Card.Header>{this.props.club.name}</Card.Header>
            <Card.Meta>{this.props.club.type}</Card.Meta>
            <Card.Description>{this.props.club.description}</Card.Description>
          </Card.Content>
          <Card id="contact-card" centered>
            <Card.Content>
              <Card.Meta>Contact: {this.props.club.contact}</Card.Meta>
              <Card.Meta>Email: {this.props.club.email}</Card.Meta>
            </Card.Content>
          </Card>
          <Card.Content extra>
            <Button className="ui button">Delete</Button>
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
