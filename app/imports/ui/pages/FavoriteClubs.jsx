import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Loader, Card, Statistic } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import Club from '../components/Club';
import { Clubs } from '../../api/club/Clubs';
import { Favorites } from '../../api/favorites/Favorites';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class FavoriteClubs extends React.Component {
  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    const favorite = _.pluck(this.props.favorites, 'FavoriteId');
    const userFavorites = _.filter(this.props.clubs, (club) => _.contains(favorite, club._id));
    const totalFavorites = _.size(userFavorites);
    return (
        <Container fluid>
          <Statistic horizontal label='Favorites' value={totalFavorites} />
          <Card.Group>
            {userFavorites.map((club, index) => <Club
                key={index}
                club={club}
                favorites={this.props.favorites}
            />)}
          </Card.Group>
        </Container>
    );
  }
}

FavoriteClubs.propTypes = {
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
})(FavoriteClubs);
