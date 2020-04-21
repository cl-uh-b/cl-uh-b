import React from 'react';
import { Grid, Segment, Header } from 'semantic-ui-react';
import { AutoForm, ErrorsField, LongTextField, SelectField, SubmitField, TextField } from 'uniforms-semantic';
import swal from 'sweetalert';
// import { Meteor } from 'meteor/meteor';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms
import { Clubs, ClubSchema } from '../../api/club/Clubs';

/** Renders the Page for adding a document. */
class AddClub extends React.Component {

  /** On submit, insert the data. */
  submit(data, formRef) {
    const { clubName, type, description, contact, email } = data;
    Clubs.insert({ clubName, type, description, contact, email },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Item added successfully', 'success');
          formRef.reset();
        }
      });
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    let fRef = null;
    return (
        <Grid container centered>
          <Grid.Column>
            <Header as="h2" textAlign="center" inverted>Add Club</Header>
            <AutoForm ref={ref => { fRef = ref; }} schema={ClubSchema} onSubmit={data => this.submit(data, fRef)} >
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

export default AddClub;
