import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Grid, Header, Statistic, Button } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';
import ParticlesBg from 'particles-bg';
import { Clubs } from '../../api/club/Clubs';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    let config = {
      num: [4, 7],
      rps: 0.1,
      radius: [5, 40],
      life: [1.5, 3],
      v: [2, 3],
      tha: [-40, 40],
      alpha: [0.6, 0],
      scale: [0.1, 0.4],
      position: 'all',
      color: ['random', '#024731'],
      cross: 'dead',
      random: 15,
    };

    if (Math.random() > 0.85) {
      config = Object.assign(config, {
        onParticleUpdate: (ctx, particle) => {
          ctx.beginPath();
          ctx.rect(
              particle.p.x,
              particle.p.y,
              particle.radius * 2,
              particle.radius * 2,
          );
          ctx.fillStyle = particle.color;
          ctx.fill();
          ctx.closePath();
        },
      });
    }
    const clubCount = Clubs.find().fetch().length;
    const spacing = { paddingTop: '78px' };
    return (
      <div>
        <Container fluid className='landing-visuals'>
          <Grid container verticalAlign='middle' style={{ height: '750px' }}>
            <Grid.Row columns={2}>
              <Grid.Column>
                <Header as='h1' className='visual-header'>
                  CL-UH-B
                  <Header.Subheader className='visual-subheader'>There&apos;s a club waiting for you.</Header.Subheader>
                </Header>
                <Link to='/signup'>
                  <Button size='large' inverted content='Get Started' className='visual-button' />
                </Link>
              </Grid.Column>
              <Grid.Column textAlign='center'>
                <Statistic size='huge'>
                  <Statistic.Value className='visual-header'>{clubCount}</Statistic.Value>
                  <Statistic.Label className='visual-subheader'>Clubs at Manoa</Statistic.Label>
                </Statistic>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <ParticlesBg type="custom" config={config} bg={true} />
        </Container>
        <div style={spacing}/>
        <Container fluid className='landing-information'>
          <Grid textAlign='center' columns='equal' divided>
            <Grid.Row>
              <Grid.Column>
                <Header as='h1' className='info-header'>What are RIOs/Clubs?</Header>
                <Header as='h4' className='info-desc'>
                  More than 200 current Registered Independent Organizations (RIOs) at the University of Hawaiʻi
                  at Mānoa serve the campus and greater community by providing leadership development for students
                  and by promoting community spirit, activism, public service, and social, recreational, and cultural
                  interaction among UHM students, faculty, and staff.
                </Header>
              </Grid.Column>
              <Grid.Column>
                <Header as='h1' className='info-header'>Student Life & Development Values</Header>
                <Header as='h4' className='info-desc'>
                  Student Life & Development values programs and services that complement all students&apos; educational
                  development and support the development and growth of Registered Independent Organizations. RIOs
                  provide a laboratory of citizenship for training students in leadership and social responsibility.
                  RIOs afford students the opportunity to practice decision-making skills, develop interpersonal
                  communication skills, learn to reduce conflict and solve problems, develop group management skills,
                  and express opinions and thoughts clearly.
                </Header>
              </Grid.Column>
              <Grid.Column>
                <Header as='h1' className='info-header'>Mission Statement</Header>
                <Header as='h4' className='info-desc'>
                  The Office of Student Life and Development (SLD) is committed to providing a spectrum of involvement
                  and learning opportunities for students through innovative programs and quality services which promote
                  leadership, life skills, and personal development while enhancing campus life.
                </Header>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </div>
    );
  }
}

export default withTracker(() => {
  const subscription = Meteor.subscribe('Clubs');
  return {
    ready: subscription.ready(),
  };
})(Landing);
