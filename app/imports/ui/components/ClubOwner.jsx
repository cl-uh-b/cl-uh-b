import React from 'react';
import { Button, Card, Image, Rating, Container } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

class ClubOwner extends React.Component {
  render() {
    let clubInterest = '';
    // Just in case the club has multiple interests.
    for (let i = 0; i < this.props.club.interest.length; i++) {
      if (i === this.props.club.interest.length - 1) {
        clubInterest += this.props.club.interest[i];
      } else {
        clubInterest += `${this.props.club.interest[i]}, `;
      }
    }

    return (
        <Card centered fluid>
          <Card.Content>
            <Image floated='left' src={this.props.club.image} />
            <Card.Header>{this.props.club.clubName}</Card.Header>
            <Card.Meta>Contact: {this.props.club.contact}</Card.Meta>
            <Card.Meta>Email: {this.props.club.email}</Card.Meta>
            <Card.Meta>Interests: {clubInterest}</Card.Meta>
            <Container fluid>{this.props.club.description}</Container>
          </Card.Content>
          <Card.Content extra>
            <Rating icon='star' defaultRating={3} maxRating={5} />
            <Button floated='right' as={Link} to={`/edit/${this.props.club._id}`}>Edit</Button>
          </Card.Content>
        </Card>
    );
  }
}

ClubOwner.propTypes = {
  club: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(ClubOwner);
