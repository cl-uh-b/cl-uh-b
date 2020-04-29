import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Card, Button, Grid } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Clubs } from '../../api/club/Clubs';
import Club from '../components/Club';
import { Favorites } from '../../api/favorites/Favorites';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class Lucky extends React.Component {

    state = { random: -1, roll: true };

    componentDidMount() {
        if (this.state.roll === true) {
            this.setState({ roll: false });
            this.interval = setInterval(() => this.setState({
                random: Math.floor(Math.random() * this.props.clubs.length),
            }), 80);
        } else {
            clearInterval(this.interval);
            this.setState({ roll: true });
        }
    }

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
        const random = Math.floor(Math.random() * this.props.clubs.length);
        return (
            <Container>
                <Grid centered>
                    <Grid.Row>
                        <Header as="h2" textAlign="center" inverted>I&apos;m Feeling Lucky!</Header>
                    </Grid.Row>
                    <Grid.Row>
                        <Card.Group>
                            {this.state.random === -1 ?
                                <Club club={this.props.clubs[random]} favorites={this.props.favorites}/> :
                                <Club club={this.props.clubs[this.state.random]} favorites={this.props.favorites}/>}
                        </Card.Group>
                    </Grid.Row>
                    <Grid.Row>
                        <Button onClick={this.componentDidMount.bind(this)}>I&apos;m Feeling Lucky!</Button>
                    </Grid.Row>
                </Grid>
            </Container>
        );
    }
}

Lucky.propTypes = {
    clubs: PropTypes.array.isRequired,
    favorites: PropTypes.array.isRequired,
    ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
    const subscription = Meteor.subscribe('LuckyClubs');
    const subscription2 = Meteor.subscribe('Favorites');
    return {
        clubs: Clubs.find({}).fetch(),
        favorites: Favorites.find({}).fetch(),
        ready: subscription.ready() && subscription2.ready(),
    };
})(Lucky);
