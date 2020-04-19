import React from 'react';
import { Card, Button, Container, Header, Image } from 'semantic-ui-react';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router-dom';

class Profile extends React.Component {
  render() {
    let profileInterest = '';
    for (let i = 0; i < Meteor.user().profile.interests.length; i++) {
      if (i === Meteor.user().profile.interests.length - 1) {
        profileInterest += Meteor.user().profile.interests[i];
      } else {
        profileInterest += `${Meteor.user().profile.interests[i]}, `;
      }
    }
    if (profileInterest === '') {
      profileInterest += 'No interests.';
    }
    return (
        <Container>
          <Header inverted as='h1'>Account Profile</Header>
          <hr/>
          <Card fluid>
            <Card.Content>
              <Card.Header>{Meteor.user().profile.firstName} {Meteor.user().profile.lastName}</Card.Header>
              <Card.Meta>{Meteor.user().profile.email}</Card.Meta>
              <Card.Description>Interest: {profileInterest}</Card.Description>
            </Card.Content>
            <Card.Content extra>
              <Link to='/editprofile'>
                <Button basic>Edit</Button>
              </Link>
            </Card.Content>
          </Card>
        </Container>
    );
  }
}

export default Profile;
