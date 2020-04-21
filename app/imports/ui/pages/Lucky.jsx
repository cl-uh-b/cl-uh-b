import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Card, Button, Grid } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Clubs } from '../../api/club/Club';
import Club from '../components/Club';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class Lucky extends React.Component {

    state = { random: Math.floor(Math.random() * 300) };

    lucky() {
        const num = Math.floor(Math.random() * this.props.clubs.length);
        this.setState({ random: num });
        return 0;
    }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <Container>
            <Grid centered>
                <Grid.Row>
                    <Header as="h2" textAlign="center" inverted>I&apos;m Feeling Lucky!</Header>
                </Grid.Row>
                <Grid.Row>
                    <Card.Group>
                    <Club club={this.props.clubs[this.state.random]}/>
                    </Card.Group>
                </Grid.Row>
                <Grid.Row>
                    <Button onClick={this.lucky.bind(this)}>I&apos;m Feeling Lucky!</Button>
                </Grid.Row>
            </Grid>
        </Container>
    );
  }
}

Lucky.propTypes = {
  clubs: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  const subscription = Meteor.subscribe('Clubs');
  return {
    clubs: Clubs.find({}).fetch(),
    ready: subscription.ready(),
  };
})(Lucky);
