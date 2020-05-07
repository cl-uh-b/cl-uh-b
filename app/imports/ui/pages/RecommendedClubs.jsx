import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Loader, Card, Statistic, Grid, Pagination } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import ModClub from '../components/ModClub';
import { Clubs } from '../../api/club/Clubs';
import { Favorites } from '../../api/favorites/Favorites';
import { Interests } from '../../api/interests/Interests';

class RecommendedClubs extends React.Component {

  state = { activePage: 1, clubsPerPage: 40 }

  handlePaginationChange = (e, { activePage }) => this.setState({ activePage: activePage })

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    const { activePage, clubsPerPage } = this.state;
    /** Find clubs based on user's interest */
    const userInterest = Meteor.user().profile.interests;
    let recommendations;
    if (userInterest.length !== 0) {
      for (let i = 0; i < userInterest.length; i++) {
        recommendations = _.filter(this.props.clubs, (club) => club.interest.includes(userInterest[i]));
      }
    } else {
      const random = Math.floor(Math.random() * this.props.interests.length);
      const interest = this.props.interests[random].interest;
      recommendations = _.filter(this.props.clubs, (club) => club.interest.includes(interest));
    }

    const totalRec = recommendations.length;

    /** Pagination */
    const totalPages = Math.ceil(recommendations.length / clubsPerPage);
    recommendations = recommendations.slice(
        (activePage - 1) * clubsPerPage,
        (activePage - 1) * clubsPerPage + clubsPerPage,
    );

    /** Sort by letter */
    recommendations = recommendations.sort((a, b) => (a.clubName > b.clubName ? 1 : -1));

    return (
        <Container fluid>
          <Grid centered>
            <Grid.Row>
              <Statistic horizontal label='Clubs Recommended For You' value={totalRec} />
            </Grid.Row>
            <Grid.Row className='fav-rec'>
              <Card.Group>
                {recommendations.map((club, index) => <ModClub
                    key={index}
                    club={club}
                    favorites={this.props.favorites}
                />)}
              </Card.Group>
            </Grid.Row>
            <Grid.Row>
              <Pagination
                  activePage={activePage}
                  totalPages={totalPages}
                  siblingRange={1}
                  onPageChange={this.handlePaginationChange}
              />
            </Grid.Row>
          </Grid>
        </Container>
    );
  }
}

RecommendedClubs.propTypes = {
  clubs: PropTypes.array.isRequired,
  favorites: PropTypes.array.isRequired,
  interests: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  const subscription1 = Meteor.subscribe('Clubs');
  const subscription2 = Meteor.subscribe('Favorites');
  const subscription3 = Meteor.subscribe('Interests');
  return {
    clubs: Clubs.find({}).fetch(),
    favorites: Favorites.find({}).fetch(),
    interests: Interests.find({}).fetch(),
    ready: subscription1.ready() && subscription2.ready() && subscription3.ready(),
  };
})(RecommendedClubs);
