import React from 'react';
import { Container, Grid, Icon, Image, Header, Divider } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    const spacing = { paddingTop: '78px' };
    return (
      <div>
        <Container fluid>
          <div className='landing-header-background'>
          <Grid stackable centered container columns={2}>
            <Grid.Column width={4} verticalAlign='middle' >
             <Image floated='left' size='medium' src='../images/cl-uh-b-logo.png'/>
            </Grid.Column>
            <Grid.Column verticalAlign='middle' textAlign='center'>
              <Header inverted as='h1'>Welcome to CL-UH-B</Header>
              <Divider inverted/>
              <Header inverted as='h2'>Club Listings at University of Hawaii Browsery</Header>
            </Grid.Column>
          </Grid>
          </div>
        </Container>
        <div style={spacing}/>
        <Container>
          <hr/>
          <Header textAlign='center' inverted as='h1'>Discover Clubs</Header>
          <Grid textAlign='center' stackable container columns={2}>
            <Grid.Column centered>
              <Link to='/browse'><Icon inverted size='huge' name='search' link=' '/></Link>
              <Header inverted as='h3'>
                Search through the <br/>
                hundreds of clubs at UH Manoa!
              </Header>
            </Grid.Column>
            <Grid.Column>
              <Link to='/browse'><Icon inverted size='huge' name='mail' link=' ' /></Link>
              <Header inverted as='h3'>
                Found a club you like? <br/>
                Their contact information is right there!
              </Header>
            </Grid.Column>
         </Grid>
        </Container>
        <div style={spacing}/>
          <Container>
            <Header textAlign='center' inverted as='h1'>Club Contacts</Header>
            <Grid textAlign='center' stackable container columns={3}>
              <Grid.Column>
                <Link to='/add'><Icon inverted size='huge' name='users' link=' ' /></Link>
                <Header inverted as='h3'>
                  Don&apos;t see your club? <br/>
                  Add it to our lists for students to find!
                </Header>
              </Grid.Column>
              <Grid.Column>
                <Link to='/my-clubs'><Icon inverted size='huge' name='edit outline' link=' ' /></Link>
                <Header inverted as='h3'>
                  It&apos; quick and easy to update your information
                </Header>
              </Grid.Column>
              <Grid.Column>
                <Link to='/my-clubs'><Icon inverted size='huge' name='star outline' link=' ' /></Link>
                <Header inverted as='h3'>
                  Curious to hear what club memebers think? Find out from the ratings
                </Header>
              </Grid.Column>
            </Grid>
            <div style={{ marginBottom: '24px' }}/>
          </Container>
      </div>
    );
  }
}

export default Landing;
