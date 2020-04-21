import React from 'react';
import { Grid, Loader, Header, Segment } from 'semantic-ui-react';
import swal from 'sweetalert';
import { AutoForm, ErrorsField, LongTextField, SelectField, SubmitField, TextField } from 'uniforms-semantic';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms
import { Clubs, ClubSchema } from '../../api/club/Clubs';

/** Renders the Page for editing a single document. */
class EditClub extends React.Component {

  /** On successful submit, insert the data. */
  submit(data) {
    const { clubName, type, description, contact, _id } = data;
    Clubs.update(_id, { $set: { clubName, type, description, contact } }, (error) => (error ?
        swal('Error', error.message, 'error') :
        swal('Success', 'Item updated successfully', 'success')));
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active inverted>Getting data</Loader>;
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  renderPage() {
    return (
        <Grid container centered>
          <Grid.Column>
            <Header as="h2" textAlign="center" inverted>Edit Club</Header>
            <AutoForm schema={ClubSchema} onSubmit={data => this.submit(data)} model={this.props.doc} >
              <Segment>
                <TextField name='clubName'/>
                <SelectField name='type'/>
                <LongTextField name='description'/>
                <Segment.Group horizontal>
                  <Segment><TextField name='contact'/></Segment>
                  <Segment><TextField name='email'/></Segment>
                </Segment.Group>
                <SubmitField value='Submit'/>
                <ErrorsField/>
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
    );
  }
}

/** Require the presence of a Stuff document in the props object. Uniforms adds 'model' to the props, which we use. */
EditClub.propTypes = {
  doc: PropTypes.object,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('MyClubs');
  return {
    doc: Clubs.findOne(documentId),
    ready: subscription.ready(),
  };
})(EditClub);
