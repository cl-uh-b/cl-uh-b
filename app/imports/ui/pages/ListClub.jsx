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

  state = { value: '' }

  handleChange = (e, { value }) => this.setState({ value })

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    const { value } = this.state;

    /** Assign key, text, values, semantic UI react dropdown */
    const options = this.props.interests.map(int => ({
      key: int.interest,
      text: int.interest,
      value: int.interest,
    }));

    /** Filter to selected interest */
    const list = this.props.clubs;
    let filteredList = [];
    if (this.state.value !== '') {
      for (let i = 0; i < this.state.value.length; i++) {
        const original = filteredList;
        const filtered = _.filter(list, (club) => club.interest.includes(this.state.value[i]));
        filteredList = _.union(original, filtered);
      }
    }

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
           {this.state.value === '' ?
             list.map((club, index) => <Club key={index} club={club} favorites={this.props.favorites}/>)
             : filteredList.map((club, index) => <Club key={index} club={club} favorites={this.props.favorites}/>)}
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
  const subscription3 = Meteor.subscribe('Interests');
  return {
    clubs: Clubs.find({}).fetch(),
    favorites: Favorites.find({}).fetch(),
    interests: Interests.find({}).fetch(),
    ready: subscription1.ready() && subscription2.ready() && subscription3.ready(),
  };
})(ListClubs);
