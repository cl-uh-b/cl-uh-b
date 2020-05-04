import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Grid, Header, Statistic, Button, Accordion, Icon } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';
import ParticlesBg from 'particles-bg';
import { _ } from 'meteor/underscore';
import PropTypes from 'prop-types';
import { Clubs } from '../../api/club/Clubs';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {

  state = { activeIndex: 0 }

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  }

  render() {
    const { activeIndex } = this.state;

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
    const approvedClubs = _.filter(Clubs.find().fetch(), (club) => club.registered !== false);
    const clubCount = approvedClubs.length;
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
                <Link to='/browse'>
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
        <div className='accordion-section'>
          <Container fluid style={{ margin: '0 290px' }}>
            <Header as='h2'>Students</Header>
            <Accordion fluid styled>
              <Accordion.Title
                  active={activeIndex === 0}
                  index={0}
                  onClick={this.handleClick}
              >
                <Icon name='dropdown' />
                Sign in/Sign up
              </Accordion.Title>
              <Accordion.Content active={activeIndex === 0}>
                <p>
                  By signing in/signing up, you get access to the club browser and features such as
                  favorites, recommendations, and &quot;I&apos;m Feeling Lucky!&quot;
                </p>
              </Accordion.Content>
              <Accordion.Title
                  active={activeIndex === 1}
                  index={1}
                  onClick={this.handleClick}
              >
                <Icon name='dropdown' />
                Browsing
              </Accordion.Title>
              <Accordion.Content active={activeIndex === 1}>
                <p>Browsing can never be simpler!</p>
                <p>Just want to browse? Just click on &quot;Browse Clubs&quot; to search through
                the hundreds of clubs at UH Manoa!</p>
                <p>You have a specific interest? Easily search for clubs that match your interest with
                our &quot;Select Interest&quot; feature!</p>
                <p>Know the club you&apos;re looking for? Use the search bar it down to keywords
                so that you can quickly find their information!</p>
              </Accordion.Content>
            </Accordion>
          </Container>
        </div>
      </div>
    );
  }
}

Landing.propTypes = {
  count: PropTypes.number,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  const subscription = Meteor.subscribe('ClubCount');
  return {
    count: Clubs.find({}).count(),
    ready: subscription.ready(),
  };
})(Landing);
