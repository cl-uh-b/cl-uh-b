import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Card, Image, Button } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Stuffs } from '../../api/stuff/Stuff';
import Club from '../components/Club';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class Lucky extends React.Component {

  clubs = [{
    contact: 'Chad Morita',
    email: 'chadmmm@hawaii.edu',
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
          <Header as="h2" textAlign="center" inverted>A Cool Club to Join</Header>
          <Card centered>
            <Card.Content>
              <Image floated='right' size='mini' src='https://acmanoa.github.io/assets/img/logos/greyhats.png' />
              <Card.Header>Grey Hats</Card.Header>
              <Card.Meta>
                <span className='date'>Academic/Professional</span>
              </Card.Meta>
              <Card.Description>
                The Grey Hats are a group focused towards cybersecurity at the University of Hawaii at Manoa.<br/>
              </Card.Description>
            </Card.Content>
            <Card.Content>
              {this.clubs.map((club, index) => <Club key={index} club={club}/>)}
            </Card.Content>
            <Card.Content extra>
              <Button className="ui button">Favorite</Button>
            </Card.Content>
          </Card>
        </Container>
    );
  }
}

Lucky.propTypes = {
  stuffs: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  const subscription = Meteor.subscribe('Stuff');
  return {
    stuffs: Stuffs.find({}).fetch(),
    ready: subscription.ready(),
  };
})(Lucky);