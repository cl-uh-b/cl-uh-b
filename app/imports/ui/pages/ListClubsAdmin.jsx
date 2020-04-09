import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Card } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Stuffs } from '../../api/stuff/Stuff';
import ClubAdmin from '../components/ClubAdmin';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListClubsAdmin extends React.Component {

  clubs = [{
    name: 'Grey Hats at UHM',
    type: 'Academic/Professional',
    contact: 'Chad Morita',
    email: 'chadmmm@hawaii.edu',
  },
    {
      name: 'Hanwoori Hawaii',
      type: 'Ethic/Cultural',
      contact: 'Ingrid Adams',
      email: 'adamsi@hawaii.edu',
    },
    {
      name: 'Graduate Women in Science HAwaii',
      type: 'Academic/Professional',
      contact: 'Madeline McKenna',
      email: 'mmck@hawaii.edu',
    },
  ];

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <Container>
          <Header as="h2" textAlign="center" inverted>Clubs at UHM (Admin)</Header>
          <Card.Group>
            {this.clubs.map((club, index) => <ClubAdmin key={index} club={club}/>)}
          </Card.Group>
        </Container>
    );
  }
}

ListClubsAdmin.propTypes = {
  stuffs: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  const subscription = Meteor.subscribe('Stuff');
  return {
    stuffs: Stuffs.find({}).fetch(),
    ready: subscription.ready(),
  };
})(ListClubsAdmin);
