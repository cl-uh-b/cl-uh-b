import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { Header, Divider, Form, Grid, Container, Message, Button, Image } from 'semantic-ui-react';
import { Accounts } from 'meteor/accounts-base';

/**
 * Signup component is similar to signin component, but we create a new user instead.
 */
class Signup extends React.Component {
  /** Initialize state fields. */
  constructor(props) {
    super(props);
    this.state = { email: '', password: '', firstName: '', lastName: ' ', error: '', redirectToReferer: false };
  }

  /** Update the form controls each time the user interacts with them. */
  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  };

  /** Handle Signup submission. Create user account and a profile entry, then redirect to the home page. */
  submit = () => {
    const { email, password, firstName, lastName } = this.state;
    const interests = [];
    Accounts.createUser({
      username: email,
      password: password,
      email: email,
      profile: {
        firstName: firstName,
        lastName: lastName,
        interests: interests,
      } }, (err) => {
      if (err) {
        this.setState({ error: err.reason });
      } else {
        this.setState({ error: '', redirectToReferer: true });
      }
    });
  };

  /** Display the signup form. Redirect to add page after successful registration and login. */
  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    // if correct authentication, redirect to from: page instead of signup screen
    if (this.state.redirectToReferer) {
      return <Redirect to={from}/>;
    }
    return (
        <Container>
          <Grid verticalAlign="middle">
            <Grid.Row columns={2}>
              <Grid.Column textAlign='center'>
                <div style={{ padding: '15px 0px 50px 0px' }}>
                <Header inverted as="h1" textAlign="center">Sign up for CL-UH-B</Header>
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
                    <Form.Input
                        name="firstName"
                        placeholder="First name"
                        type="firstName"
                        onChange={this.handleChange}
                    />
                    <Form.Input
                        name="lastName"
                        placeholder="Last name"
                        type="lastName"
                        onChange={this.handleChange}
                    />
                    <Form.Button content="Register"/>
                </Form>
                {this.state.error === '' ? (
                    ''
                ) : (
                    <Message
                        error
                        header="Registration was not successful"
                        content={this.state.error}
                    />
                )}
                </div>
                <Divider inverted horizontal>OR</Divider>
                <div style={{ padding: '50px 0px 15px 0px' }}>
                  <Header inverted textAlign='center' as='h3'>
                    Already have an account? <br/>
                    Sign in now!
                  </Header>
                  <Link to="/signin">
                    <Button content='Sign in' icon='sign in' size='medium' />
                  </Link>
                </div>
              </Grid.Column>
              <Grid.Column>
                <Image centered src='../images/signuppic.jpg' size='large'/>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
    );
  }
}

/** Ensure that the React Router location object is available in case we need to redirect. */
Signup.propTypes = {
  location: PropTypes.object,
};

export default Signup;
