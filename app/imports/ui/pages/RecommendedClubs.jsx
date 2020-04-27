import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Loader, Card, Statistic } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import Club from '../components/Club';
import { Clubs } from '../../api/club/Clubs';
import { Favorites } from '../../api/favorites/Favorites';
class RecommendedClubs extends React.Component {
  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    /** Find clubs based on user's interest */
    const userInterest = Meteor.user().profile.interests;
    let recommendations = [];
    for (let i = 0; i < userInterest.length; i++) {
      for (let j = 0; j < this.props.clubs.length; j++) {
        if (this.props.clubs[j].interest.includes(userInterest[i])) {
          recommendations.push(this.props.clubs[j]);
        }
      }
    }
    recommendations = _.uniq(recommendations);

    return (
        <Container fluid>
          <Statistic inverted horizontal label='Clubs Recommended For You' value={recommendations.length} />
          <Card.Group>
            {recommendations.map((club, index) => <Club
                key={index}
                club={club}
                favorites={this.props.favorites}
            />)}
          </Card.Group>
        </Container>
    );
  }
}

RecommendedClubs.propTypes = {
  clubs: PropTypes.array.isRequired,
  favorites: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  const subscription1 = Meteor.subscribe('Clubs');
  const subscription2 = Meteor.subscribe('Favorites');
  return {
    clubs: Clubs.find({}).fetch(),
    favorites: Favorites.find({}).fetch(),
    ready: subscription1.ready() && subscription2.ready(),
  };
})(RecommendedClubs);
