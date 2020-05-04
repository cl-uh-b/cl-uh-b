import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router-dom';
import { Grid, Header, Segment, Button } from 'semantic-ui-react';
import swal from 'sweetalert';
import { AutoForm, ErrorsField, SubmitField, TextField } from 'uniforms-semantic';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms
import SimpleSchema from 'simpl-schema';
import { _ } from 'meteor/underscore';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import MultiSelectField from '../forms/controllers/MultiSelectField';
import { updateProfileMethod } from '../../startup/both/Methods';
import { Interests } from '../../api/interests/Interests';

const makeSchema = (clubInterests) => new SimpleSchema({
  firstName: { type: String, label: 'First Name' },
  lastName: { type: String, label: 'Last Name' },
  interests: { type: Array, label: 'Interests', optional: true },
  'interests.$': { type: String, allowedValues: clubInterests },
  picture: { type: String, label: 'Profile Picture', optional: true },
});

/** Renders the Page for editing a single document. */
class EditProfile extends React.Component {

  /** On successful submit, insert the data. */
  submit(data, formRef) {
    Meteor.call(updateProfileMethod, data, (error) => {
      if (error) {
        swal('Error', error.message, 'error');
      } else {
        swal('Success', 'Profile updated', 'success').then(() => formRef.reset());
      }
    });
  }

  render() {
    const clubInterests = _.pluck(Interests.find().fetch(), 'interest');
    const formSchema = makeSchema(clubInterests);
    const user = Meteor.user().profile;
    const model = _.extend({}, user);
    let fRef = null;
    return (
        <Grid textAlign='center' style={{ height: '75vh' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" textAlign="center" inverted>Edit Club</Header>
            <AutoForm ref={ref => { fRef = ref; }} schema={formSchema}
                      onSubmit={data => this.submit(data, fRef)} model={model} >
              <Segment stacked>
                  <TextField name='firstName' showInlineError={true}/>
                  <TextField name='lastName' showInlineError={true}/>
                  <MultiSelectField name='interests' />
                  <TextField name='picture' showInLineError={true}/>
                <SubmitField value='Submit'/>
                <Link to="/profile"><Button>Back</Button></Link>
                <ErrorsField/>
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
    );
  }
}
EditProfile.propTypes = {
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  const subscription = Meteor.subscribe('Interests');
  return {
    ready: subscription.ready(),
  };
})(EditProfile);
