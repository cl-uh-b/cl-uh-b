import React from 'react';
import { Card, Image, Label, Rating, Modal, Button, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { Favorites } from '../../api/favorites/Favorites';
import { Clubs, ClubSchema } from '../../api/club/Clubs';

class ModClub extends React.Component {
  handleRate = () => {
    const owner = Meteor.user().username;
    if (_.contains(_.pluck(this.props.favorites, 'FavoriteId'), this.props.club._id)) {
      Clubs.update(this.props.club._id, { $inc: { favoritesCount: -1 } });
      const removeList = _.findWhere(this.props.favorites, { FavoriteId: this.props.club._id });
      Favorites.remove(removeList._id);
    } else {
      Clubs.update(this.props.club._id, { $inc: { favoritesCount: 1 } });
      Favorites.insert({ FavoriteId: this.props.club._id, owner });
    }
  };

  render() {
    let defaultRating = 0;
    if (_.contains(_.pluck(this.props.favorites, 'FavoriteId'), this.props.club._id)) {
      defaultRating = 1;
    } else {
      defaultRating = 0;
    }
    return (
        <Card centered>
          <Card.Content>
            <Image id="card-image"
              floated={'right'}
              src={this.props.club.image}
            />
            <Card.Header>{this.props.club.clubName}</Card.Header>
          </Card.Content>
          <Card.Content extra>
            {_.map(this.props.club.interest,
                (interest, index) => <Label key={index} size='tiny' color='teal'>{interest}</Label>)}
          </Card.Content>
          <Card.Content extra>
            <Rating
                icon='heart'
                rating={defaultRating}
                schema={ClubSchema}
                onRate={this.handleRate}
                maxRating={1}/>
            <Button>Show Modal</Button>
          </Card.Content>
        </Card>
    );
  }
}

ModClub.propTypes = {
  club: PropTypes.object.isRequired,
  favorites: PropTypes.array.isRequired,
};


/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(ModClub);
