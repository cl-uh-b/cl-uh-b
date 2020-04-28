import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Card } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Clubs } from '../../api/club/Clubs';
import SubmittedClubs from '../components/SubmittedClubs';


/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class SubmissionsPage extends React.Component {

  temp = [{
    clubName: 'Testing 1',
    type: 'Academic/Professional',
    contact: 'Harriet Tubs',
    email: 'ht@foo.com',
    description: 'The Grey Hats are a group focused towards cybersecurity at the University of Hawaii at Manoa.',
    image: 'https://acmanoa.github.io/assets/img/logos/greyhats.png',
  },
    {
      clubName: 'Testing 2',
      type: 'Ethic/Cultural',
      contact: 'Johnny Adds',
      email: 'ja@foo.com',
      description: 'Lorem ipsum and all that jazz',
      image: 'https://manoa.hawaii.edu/admissions/images/stacked.png',
    },
    {
      clubName: 'Testing 3',
      type: 'Academic/Professional',
      contact: 'Winsty Chur',
      email: 'wc@foo.com',
      description: 'Lorem ipsum and all that jazz',
      image: 'https://manoa.hawaii.edu/admissions/images/stacked.png',
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
          <Header as="h2" textAlign="center" inverted>Submissions</Header>
          <Card.Group>
            {this.temp.map((club, index) => <SubmittedClubs key={index} club={club}/>)}
          </Card.Group>
        </Container>
    );
  }
}

SubmissionsPage.propTypes = {
  clubs: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  const subscription = Meteor.subscribe('Submitted');
  return {
    clubs: Clubs.find({}).fetch(),
    ready: subscription.ready(),
  };
})(SubmissionsPage);
