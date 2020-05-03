import React from 'react';
import swal from 'sweetalert';
import { Button, Card, Image, Label } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { _ } from 'meteor/underscore';
import { Clubs } from '../../api/club/Clubs';

class SubmittedClubs extends React.Component {

  denySubmission(docID) {
    swal({
      title: 'Are you sure?',
      buttons: ['Cancel', 'Deny'],
      dangerMode: true,
      closeOnClickOutside: false,
    })
        .then((willDelete) => {
          if (willDelete) {
            swal('Reason for denying submission:', {
              content: 'input',
              closeOnClickOutside: false,
            })
                .then((value) => {
                  if (value !== '') {
                    Clubs.remove(docID);
                    swal('Club has been denied.', {
                      icon: 'success',
                      closeOnClickOutside: false,
                    });
                  } else {
                    swal({
                      text: 'Must provide a reason for denying submission.',
                      icon: 'warning',
                      dangerMode: true,
                      closeOnClickOutside: false,
                    });
                  }
                });
          }
        });
  }

  registeredTrue(docID) {
    swal({
      title: 'Are you sure?',
      buttons: ['Cancel', 'Accept'],
      closeOnClickOutside: false,
    })
        .then((willAccept) => {
          if (willAccept) {
            swal('Club has been accepted.', {
              icon: 'success',
              closeOnClickOutside: false,
            });
            Clubs.update(docID, { $set: { registered: true } });
          }
        });
  }

  render() {

    return (
        <Card centered>
          <Card.Content>
            <Image id="card-image"
                   floated={'right'}
                // size={'mini'}
                   src={this.props.club.image}
            />
            <Card.Header>{this.props.club.clubName}</Card.Header>
            <Card.Meta>{this.props.club.type}</Card.Meta>
            <Card.Description>{this.props.club.description}</Card.Description>
          </Card.Content>
          <Card.Content extra>
            {_.map(this.props.club.interest,
                (interest, index) => <Label key={index} size='tiny' color='teal'>{interest}</Label>)}
          </Card.Content>
          <Card id="contact-card" centered>
            <Card.Content>
              <Card.Meta>Contact: {this.props.club.contact}</Card.Meta>
              <Card.Meta>Email: {this.props.club.email}</Card.Meta>
            </Card.Content>
          </Card>
          <Card.Content extra>
            <Button className="ui button"
            onClick={() => { this.registeredTrue(this.props.club._id); } }
            >
              Accept</Button>
            <Button className="ui button" floated="right"
                    onClick={() => { this.denySubmission(this.props.club._id); } }>
              Deny</Button>
          </Card.Content>
        </Card>
    );
  }
}

SubmittedClubs.propTypes = {
  club: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(SubmittedClubs);
