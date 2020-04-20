import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Header, Divider, Form, Grid, Container, Message, Button, Image } from 'semantic-ui-react';

/**
 * Signin page overrides the form’s submit event and call Meteor’s loginWithPassword().
 * Authentication errors modify the component’s state to be displayed
 */
export default class Signin extends React.Component {

  /** Initialize component state with properties for login and redirection. */
  constructor(props) {
    super(props);
    this.state = { email: '', password: '', error: '', redirectToReferer: false };
  }

  /** Update the form controls each time the user interacts with them. */
  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  }

  /** Handle Signin submission using Meteor's account mechanism. */
  submit = () => {
    const { email, password } = this.state;
    Meteor.loginWithPassword(email, password, (err) => {
      if (err) {
        this.setState({ error: err.reason });
      } else {
        this.setState({ error: '', redirectToReferer: true });
      }
    });
  }

  /** Render the signin form. */
  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    // if correct authentication, redirect to page instead of login screen
    if (this.state.redirectToReferer) {
      return <Redirect to={from}/>;
    }
    // Otherwise return the Login form.
    return (
        <Container>
        <Grid verticalAlign='middle'>
          <Grid.Row columns={2}>
            <Grid.Column>
            <Image centered src='../images/signinpic.jpg' size='large'/>
            </Grid.Column>
            <Grid.Column textAlign='center'>
              <div style={{ padding: '15px 0px 50px 0px' }}>
              <Header inverted as='h1'>Sign in to CL-UH-B</Header>
              <Form onSubmit={this.submit}>
                  <Form.Input
                    icon="user"
                    iconPosition="left"
                    name="email"
                    type="email"
                    placeholder="E-mail address"
                    onChange={this.handleChange}
                  />
                  <Form.Input
                    icon="lock"
                    iconPosition="left"
                    name="password"
                    placeholder="Password"
                    type="password"
                    onChange={this.handleChange}
                  />
                  <Form.Button content="Sign in"/>
              </Form>
              {this.state.error === '' ? (
                ''
              ) : (
                <Message
                  error
                  header="Login was not successful"
                  content={this.state.error}
                />
              )}
              </div>
              <Divider inverted horizontal>OR</Divider>
              <div style={{ padding: '50px 0px 15px 0px' }}>
              <Header inverted textAlign='center' as='h3'>
                Create an account now <br/>
                and look for clubs!
              </Header>
              <Link to="/signup">
                <Button content='Sign up' icon='signup' size='medium' />
              </Link>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        </Container>
    );
  }
}

/** Ensure that the React Router location object is available in case we need to redirect. */
Signin.propTypes = {
  location: PropTypes.object,
};
