import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router-dom';
import { Grid, Header, Segment, Button } from 'semantic-ui-react';
import swal from 'sweetalert';
import { AutoForm, ErrorsField, SubmitField, TextField } from 'uniforms-semantic';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms
import SimpleSchema from 'simpl-schema';
import { _ } from 'meteor/underscore';
import MultiSelectField from '../forms/controllers/MultiSelectField';
import { updateProfileMethod } from '../../startup/both/Methods';

const interestNames = [
    'Academic/Professional',
    'Religious/Spiritual',
    'Political',
    'Sports/Leisure',
    'Service',
    'Fraternity/Sorority',
    'Ethnic/Cultural',
];

const ProfileSchema = new SimpleSchema({
  firstName: String,
  lastName: String,
  interests: { type: Array, optional: true },
  'interests.$': { type: String, allowedValues: interestNames },
  picture: { type: String, optional: true },
});

/** Renders the Page for editing a single document. */
class EditProfile extends React.Component {

  /** On successful submit, insert the data. */
  submit(data) {
    Meteor.call(updateProfileMethod, data, (error) => {
      if (error) {
        swal('Error', error.message, 'error');
      } else {
        swal('Success', 'Profile updated', 'success');
      }
    });
  }

  render() {
    const user = Meteor.user().profile;
    const model = _.extend({}, user);
    return (
        <Grid textAlign='center' style={{ height: '75vh' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" textAlign="center" inverted>Edit Club</Header>
            <AutoForm schema={ProfileSchema} onSubmit={data => this.submit(data)} model={model} >
              <Segment stacked>
                <TextField name='firstName'/>
                <TextField name='lastName'/>
                <MultiSelectField name='interests' showInlineError={true} placeholder={'Interests (Select)'}/>
                <TextField name='picture' placeholder={'Picture (Link)'}/>
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

export default EditProfile;
