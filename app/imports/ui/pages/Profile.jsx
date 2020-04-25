import React from 'react';
import { Card, Button, Container, Header, Grid, Image } from 'semantic-ui-react';
import { Roles } from 'meteor/alanning:roles';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router-dom';
import Favorites from './Favorites';

class Profile extends React.Component {
  render() {
    let profileInterest = '';
    let profileRole = '';
    let profilePicture = '';

    // Goes through each of the user's profile interest
    for (let i = 0; i < Meteor.user().profile.interests.length; i++) {
      if (i === Meteor.user().profile.interests.length - 1) {
        profileInterest += Meteor.user().profile.interests[i];
      } else {
        profileInterest += `${Meteor.user().profile.interests[i]}, `;
      }
    }
    // Set no interest if none is declared
    if (profileInterest === '') {
      profileInterest += 'No interests.';
    }
    // Set default role if none is declared
    if (Roles.userIsInRole(Meteor.userId(), 'admin')) {
      profileRole = 'Admin';
    } else if (Roles.userIsInRole(Meteor.userId(), 'clubOwner')) {
      profileRole = 'Club Owner';
    } else {
      profileRole = 'Student';
    }

    // Set a default profile picture if none is declared
    if (Meteor.user().profile.picture === '' || Meteor.user().profile.picture) {
      profilePicture = 'https://cdn3.f-cdn.com/contestentries/1376995/30494909/5b566bc71d308_thumb900.jpg';
    } else {
      profilePicture = Meteor.user().profile.picture;
    }

    return (
        <Container>
          <Header inverted as='h1'>Account Profile</Header>
          <hr/>
          <Grid>
            <Grid.Row columns={2}>
              <Grid.Column width={4}>
                <Card className='profile-card'>
                  <Image src={profilePicture} wrapped ui={false} />
                  <Card.Content>
                    <Card.Header className='profile-header'>
                      {Meteor.user().profile.firstName} {Meteor.user().profile.lastName}
                    </Card.Header>
                    <Card.Meta>{Meteor.user().username}</Card.Meta>
                    <Card.Description>Interest: {profileInterest}</Card.Description>
                    <Card.Description>Role: {profileRole}</Card.Description>
                  </Card.Content>
                  <Card.Content extra>
                    <Link to='/editprofile'>
                      <Button basic>Edit</Button>
                    </Link>
                  </Card.Content>
                </Card>
              </Grid.Column>
              <Grid.Column width={12}><Favorites/></Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
    );
  }
}

export default Profile;
