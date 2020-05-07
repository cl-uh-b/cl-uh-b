import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Card, Button, Grid } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import ClubOwner from '../components/ClubOwner';
import { Clubs } from '../../api/club/Clubs';
import ClubPending from '../components/ClubPending';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class MyClub extends React.Component {

    state = { redirect: false };

    add() {
        this.setState({ redirect: true });
    }

    /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
    render() {
        return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
    }

    /** Render the page once subscriptions have been received. */
    renderPage() {
        if (this.state.redirect === false) {
            return (
                <Container>
                    <Header as="h2" textAlign="center">My Clubs</Header>
                    {this.props.clubs.length !== 0 ?
                        // this.props.clubs.map((club) => console.log(club.clubName)) :
                        <Card.Group>
                            {this.props.clubs.map((club, index) => (club.registered === true ?
                                <ClubOwner key={index} club={club}/> : <ClubPending key={index} club={club}/>))}
                        </Card.Group> :
                        <Grid centered>
                            <Grid.Row>
                                <p id='noClubs'>
                                Sorry, It seems like you don&apos;t have any clubs yet.
                                </p>
                            </Grid.Row>
                            <Grid.Row>
                                <Button onClick={this.add.bind(this)}>Click here to create a new club!</Button>
                            </Grid.Row>
                        </Grid>
                    }
                </Container>
            );
        }

        return (
            <Redirect to='/add' />
            );
    }
}

MyClub.propTypes = {
    clubs: PropTypes.array.isRequired,
    ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
    const subscription = Meteor.subscribe('MyClubs');
    return {
        clubs: Clubs.find({}).fetch(),
        ready: subscription.ready(),
    };
})(MyClub);
