import React from 'react';
import { Button, Card, Image, Label } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { _ } from 'meteor/underscore';

class SubmittedClubs extends React.Component {
  render() {

    return (
        <Card centered>
          <Card.Content>
            <Image id="card-image"
                   floated={'right'}
                // size={'mini'}
                   src={this.props.club.image}
            />
            <Card.Header>{this.props.club.clubName}</Card.Header>
            <Card.Meta>{this.props.club.type}</Card.Meta>
            <Card.Description>{this.props.club.description}</Card.Description>
          </Card.Content>
          <Card.Content extra>
            {_.map(this.props.club.interest,
                (interest, index) => <Label key={index} size='tiny' color='teal'>{interest}</Label>)}
          </Card.Content>
          <Card id="contact-card" centered>
            <Card.Content>
              <Card.Meta>Contact: {this.props.club.contact}</Card.Meta>
              <Card.Meta>Email: {this.props.club.email}</Card.Meta>
            </Card.Content>
          </Card>
          <Card.Content extra>
            <Button className="ui button">Accept</Button>
            <Button className="ui button" floated="right">Deny</Button>
          </Card.Content>
        </Card>
    );
  }
}

SubmittedClubs.propTypes = {
  club: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(SubmittedClubs);