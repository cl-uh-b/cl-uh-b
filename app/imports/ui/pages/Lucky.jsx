import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Header, Loader, Card, Button, Grid, Transition } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Clubs } from '../../api/club/Clubs';
import ModClub from '../components/ModClub';
import { Favorites } from '../../api/favorites/Favorites';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class Lucky extends React.Component {

    state = { random: -1, roll: true, animation: true };

    componentDidMount() {
        if (this.state.roll === true) {
            this.setState({ roll: false, animation: true });
            this.interval = setInterval(() => this.setState({
                random: Math.floor(Math.random() * this.props.clubs.length),
            }), 60);
        } else {
            this.pause();
        }
    }

    pause() {
        clearInterval(this.interval);
        this.setState({ roll: true, animation: false });
    }

    componentWillUnmount() {
        clearInterval(this.interval);
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
        let duration = 400;
        let animation = 'shake';
        if (this.state.animation === false) {
            duration = 800;
            animation = 'jiggle';
        }
        return (
                <Grid centered container>
                    <Grid.Row>
                        <Header as="h2" textAlign="center">I&apos;m Feeling Lucky!</Header>
                    </Grid.Row>
                    <Grid.Row>
                      {this.state.animation ?
                          <Button onClick={this.componentDidMount.bind(this)}> Click Me to Stop</Button> :
                          <Button onClick={this.componentDidMount.bind(this)}> I&apos;m Feeling Lucky!</Button>}
                    </Grid.Row>
                    <Grid.Row>
                        <Transition visible={this.state.animation} animation={animation} duration={duration}>
                            <Card.Group>
                                <ModClub club={this.props.clubs[random]} favorites={this.props.favorites}/>
                            </Card.Group>
                        </Transition>
                    </Grid.Row>
                </Grid>
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
