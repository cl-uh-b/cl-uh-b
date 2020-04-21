import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Card } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import ClubOwner from '../components/ClubOwner';
import { Clubs } from '../../api/club/Clubs';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class MyClub extends React.Component {

  // clubs = [{
  //     name: 'Club Owner',
  //     type: 'Test',
  //     contact: 'Club',
  //     email: 'club@foo.com',
  //     description: 'Testing role',
  //     image: 'https://manoa.hawaii.edu/admissions/images/stacked.png',
  //   },
  // ];

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <Container>
          <Header as="h2" textAlign="center" inverted>My Clubs</Header>
          <Card.Group>
            {this.props.clubs.map((club, index) => <ClubOwner key={index} club={club}/>)}
          </Card.Group>
        </Container>
    );
  }
}

MyClub.propTypes = {
  clubs: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  const subscription = Meteor.subscribe('MyClubs');
  return {
    clubs: Clubs.find({}).fetch(),
    ready: subscription.ready(),
  };
})(MyClub);
