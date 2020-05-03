import React from 'react';
import swal from 'sweetalert';
import { Card, Button, Image, Label } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { _ } from 'meteor/underscore';
import { Clubs } from '../../api/club/Clubs';

class ClubAdmin extends React.Component {
  removeClub(docID) {
    swal({
      title: 'Are you sure?',
      buttons: ['Cancel', 'Delete'],
      dangerMode: true,
      closeOnClickOutside: false,
    })
        .then((willDelete) => {
          if (willDelete) {
            swal('Reason for removal:', {
              content: 'input',
              closeOnClickOutside: false,
            })
                .then((value) => {
                  if (value !== '') {
                    Clubs.remove(docID);
                    swal('Club has been removed.', {
                      icon: 'success',
                      closeOnClickOutside: false,
                    });
                  } else {
                    swal({
                      text: 'Must provide a reason for removal.',
                      icon: 'warning',
                      dangerMode: true,
                      closeOnClickOutside: false,
                    });
                  }
                });
          }
        });
  }

  render() {
    return (
        <Card centered>
          <Card.Content>
            <Image id="card-image"
                   floated={'right'}
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
            <Button floated='right' onClick={() => { this.removeClub(this.props.club._id); } }>Delete</Button>
          </Card.Content>
        </Card>
    );
  }
}

ClubAdmin.propTypes = {
  club: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(ClubAdmin);
