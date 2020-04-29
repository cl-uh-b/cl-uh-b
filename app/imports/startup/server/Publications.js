import { Meteor } from 'meteor/meteor';
import { Clubs } from '../../api/club/Clubs';
import { Interests } from '../../api/interests/Interests';
import { Favorites } from '../../api/favorites/Favorites';

/** This subscription publishes only the clubs owned by the logged in user */
Meteor.publish('MyClubs', function publish() {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Clubs.find({ email: username });
  }
  return this.ready();
});

/** This subscription publishes all the clubs for all users to browse. */
Meteor.publish('Clubs', function publish() {
    return Clubs.find();
});

Meteor.publish('Interests', function publish() {
  return Interests.find();
});

Meteor.publish('Favorites', function publish() {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Favorites.find({ owner: username });
  }
  return this.ready();
});

/** This subscription publishes only the clubs that have been submitted to view. */
Meteor.publish('Submitted', function publish() {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Clubs.find({ email: username });
  }
  return this.ready();
});
