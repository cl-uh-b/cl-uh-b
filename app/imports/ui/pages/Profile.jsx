import React from 'react';
import { Card, Button, Container, Header, Grid, Image, Tab, Menu, Icon } from 'semantic-ui-react';
import { Roles } from 'meteor/alanning:roles';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router-dom';
import FavoriteClubs from './FavoriteClubs';
import RecommendedClubs from './RecommendedClubs';

class Profile extends React.Component {
  render() {
    let profileInterest = '';
    let profileRole = '';
    let profilePicture = '';

    /** Get user profile interest */
    for (let i = 0; i < Meteor.user().profile.interests.length; i++) {
      if (i === Meteor.user().profile.interests.length - 1) {
        profileInterest += Meteor.user().profile.interests[i];
      } else {
        profileInterest += `${Meteor.user().profile.interests[i]}, `;
      }
    }
    /** Display no interest */
    if (profileInterest === '') {
      profileInterest += 'No interests.';
    }
    /** Display user's role */
    if (Roles.userIsInRole(Meteor.userId(), 'admin')) {
      profileRole = 'Admin';
    } else if (Roles.userIsInRole(Meteor.userId(), 'clubOwner')) {
      profileRole = 'Club Owner';
    } else {
      profileRole = 'Student';
    }

    /** Default profile picture */
    if (Meteor.user().profile.picture) {
      profilePicture = Meteor.user().profile.picture;
    } else {
      profilePicture += 'https://cdn3.f-cdn.com/contestentries/1376995/30494909/5b566bc71d308_thumb900.jpg';
    }

    /** Tab panes with user's favorites and recommendations */
    const panes = [
      {
        menuItem: (
            <Menu.Item key='favorites' className='tab-menu'>
              Favorites&nbsp;&nbsp;<Icon name='heart' inverted/>
            </Menu.Item>
        ),
        render: () => <Tab.Pane attached={false} className='tab-pane'><FavoriteClubs /></Tab.Pane>,
      },
      {
        menuItem: (
            <Menu.Item key='recommended' className='tab-menu'>
              Reccomended For You
            </Menu.Item>
        ),
        render: () => <Tab.Pane attached={false} className='tab-pane'><RecommendedClubs /></Tab.Pane>,
      },
    ];

    return (
        <Container fluid className='profile-page'>
          <Header inverted as='h1'>Account Profile</Header>
          <hr/>
          <Grid>
            <Grid.Row columns={2}>
              <Grid.Column width={3}>
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
              <Grid.Column width={13}>
                <Tab menu={{ secondary: true, pointing: true }} panes={panes}/>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
    );
  }
}

export default Profile;
