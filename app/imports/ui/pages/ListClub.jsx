import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Card, Segment } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import SimpleSchema from 'simpl-schema';
import { _ } from 'meteor/underscore';
import { AutoForm, SubmitField } from 'uniforms-semantic';
import Club from '../components/Club';
import { Clubs } from '../../api/club/Clubs';
import { Interests } from '../../api/interests/Interests';
import MultiSelectField from '../forms/controllers/MultiSelectField';

const makeSchema = (clubInterests) => new SimpleSchema({
  interest: { type: Array, label: 'Interests', optional: true },
  'interest.$': { type: String, allowedValues: clubInterests },
});

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListClubs extends React.Component {

  constructor(props) {
    super(props);
    this.state = { interests: [] };
  }

  submit(data) {
    this.setState({ interests: data.interests || [] });
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    const clubInterests = _.pluck(Interests.find().fetch(), 'interest');
    const formSchema = makeSchema(clubInterests);
    return (
        <Container>
          <AutoForm schema={formSchema} onSubmit={data => this.submit(data)} >
            <Segment>
              <MultiSelectField name='interest' showInlineError={true} placeholder={'Interests'}/>
              <SubmitField value='Submit'/>
            </Segment>
          </AutoForm>
          <Header as="h2" textAlign="center" inverted>Clubs at UHM</Header>
          <Card.Group>
            {this.props.clubs.map((club, index) => <Club key={index} club={club} />)}
          </Card.Group>
        </Container>
    );
  }
}

ListClubs.propTypes = {
  clubs: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  const subscription1 = Meteor.subscribe('Clubs');
  const subscription2 = Meteor.subscribe('Interests');
  return {
    clubs: Clubs.find({}).fetch(),
    ready: subscription1.ready() && subscription2.ready(),
  };
})(ListClubs);
