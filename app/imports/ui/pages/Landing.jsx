import React from 'react';
import { Container, Grid, Icon, Image, Header } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    const spacing = { paddingTop: '78px' };
    return (
      <div>
        <Container fluid>
          <div className='landing-header-background'>
          <Grid stackable centered container columns={1}>
            <Grid.Column textAlign='center'>
              <Image centered size='small' src='../images/uh-logo.png'/>
              <Header inverted as='h1'>Welcome to CL-UH-B</Header>
              <Header inverted as='h2'> Join today to find a club</Header>
            </Grid.Column>
          </Grid>
          </div>
        </Container>
        <div style={spacing}/>
        <Container>
          <Header textAlign='center' inverted as='h1'>Students</Header>
          <Grid textAlign='center' stackable container columns={2}>
            <Grid.Column>
              <Icon inverted size='huge' name='search'/>
              <Header inverted as='h3'>
                Search through the hundreds of clubs at UH Manoa!
              </Header>
              </Grid.Column>
            <Grid.Column>
              <Icon inverted size='huge' name='mail'/>
              <Header inverted as='h3'>
                Found a club you like? Their contact information is right there!
              </Header>
            </Grid.Column>
         </Grid>
        </Container>
        <div style={spacing}/>
        <Container>
          <Header textAlign='center' inverted as='h1'>Club Owners</Header>
          <Grid textAlign='center' stackable container columns={3}>
            <Grid.Column>
              <Icon inverted size='huge' name='users' />
              <Header inverted as='h3'>
                Don&apos;t see your club? Add it to our lists for students to find!
              </Header>
            </Grid.Column>
            <Grid.Column>
              <Icon inverted size='huge' name='edit outline'/>
              <Header inverted as='h3'>
                It&apos; quick and easy to update your information
              </Header>
            </Grid.Column>
            <Grid.Column>
              <Icon inverted size='huge' name='star outline'/>
              <Header inverted as='h3'>
                Curious to hear what club memebers think? Find out from the ratings
              </Header>
            </Grid.Column>
          </Grid>
        </Container>
      </div>
    );
  }
}

export default Landing;
