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

    const interestDupes = _.pluck(this.props.clubs, 'interest');
    const interestflat = _.flatten(interestDupes);
    const interest = _.uniq(interestflat);
    const options = interest.map(int => ({
      key: int,
      text: int,
      value: int,
    }));
    console.log(`plucked: ${interestDupes}`);
    console.log(`flat: ${interestflat}`);
    console.log(`unique: ${interest}`);
    console.log(`mapped interests: ${options}`);

    const list = this.props.clubs;
    // console.log(`list: ${list}`);
    console.log(`list amt before : ${list.length}`);
    console.log(`state value: ${this.state.value}`);

    console.log(`test club interest: ${this.props.clubs[0].interest[0]}`);
    console.log(`test club amt: ${this.props.clubs.length}`);
    console.log(`test state amt: ${this.state.value.length}`);

    // splice works 281 -> 280
    // list.splice(0, 1);
    // console.log(`list amt after splice  : ${list.length}`);

    for (let x = 0; x < this.props.clubs.length; x++) { // *go through every club
       // console.log(x);
      if (this.state.value.length !== 0) { // *if there are selected interests
        // console.log('in if 1');
        if (this.state.value.length <= list[x].interest.length) {
          // *if there are less interests selected than the club has
          // console.log('in if 2');
          for (let y = 0; y < this.state.value.length; y++) { // *go through every selected interest
            if (this.props.clubs[x].interest.indexOf(this.state.value[y] === -1)) {
              // *if the club does not have a selected interest
              list.splice(x, 1); // remove the club at position x (club being checked)
            }
          }
        }
      }
    }
    console.log(`list after filter: ${list.length}`);
    // ** issues, list doesn't reset after removing interest selections
    // some clubs are not being properly filtered ie clicking "Academic" still leaves clubs with "Service"
    // crashes after clicking multiple interests "Cannot read property 'interest' of undefined" line 61.
    //   ^ clicked "Professonal" then "Religious, likely related to issue 1

    // if (this.state.value !== '') {
    //   list = list.filter(a => a.interest.indexOf(this.state.value) > -1);
    // }
    // if (this.state.value === '') {
    //   list = this.props.clubs;
    // }
    //   else {
    //   list = _.filter(this.props.clubs, (club) => club.interest.some(r => this.state.value.indexOf(r) >= 0));
    // }

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
           {/* {this.props.clubs.map((club, index) => <Club key={index} club={club}
           favorites={this.props.favorites}/>)} */}
           {list.map((club, index) => <Club key={index} club={club} favorites={this.props.favorites}/>)}
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
