import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Card, Dropdown } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import Club from '../components/Club';
import { Clubs } from '../../api/club/Clubs';
import { Interests } from '../../api/interests/Interests';
import { Favorites } from '../../api/favorites/Favorites';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListClubs extends React.Component {

  state = {}

  handleChange = (e, { value }) => this.setState({ value })

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    const { value } = this.state;

    const interestDupes = _.pluck(this.props.clubs, 'interest');
    const interestflat = _.flatten(interestDupes);
    const interest = _.uniq(interestflat);
    const options = interest.map(int => ({
      key: int,
      text: int,
      value: int,
    }));
    console.log(interestDupes);
    console.log(interestflat);
    console.log(interest);
    console.log(options);

    return (
        <Container>
          <Header as="h2" textAlign="center">Clubs at UHM</Header>
          <Dropdown
              clearable fluid search selection multiple
              placeholder='Select Interest'
              value={value}
              onChange={this.handleChange}
              options={options}
          />
          <Header as="h2" textAlign="center" inverted>Clubs at UHM</Header>
          <Card.Group>
            {this.props.clubs.map((club, index) => <Club key={index} club={club} favorites={this.props.favorites}/>)}
          </Card.Group>
        </Container>
    );
  }
}

ListClubs.propTypes = {
  clubs: PropTypes.array.isRequired,
  interests: PropTypes.array.isRequired,
  favorites: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  const subscription1 = Meteor.subscribe('Clubs');
  const subscription2 = Meteor.subscribe('Favorites');
  return {
    clubs: Clubs.find({}).fetch(),
    favorites: Favorites.find({}).fetch(),
    interests: Interests.find({}).fetch(),
    ready: subscription1.ready() && subscription2.ready(),
  };
})(ListClubs);
