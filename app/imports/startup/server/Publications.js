import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Clubs } from '../../api/club/Clubs';
import { Interests } from '../../api/interests/Interests'


/** This subscription publishes only the clubs owned by the logged in user */
Meteor.publish('MyClubs', function publish() {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Clubs.find({ email: username });
  }
  return this.ready();
});

/** This subscription publishes all clubs regardless of user, but only if the logged in user is the Admin. */
Meteor.publish('ClubsAdmin', function publish() {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Clubs.find();
  }
  return this.ready();
});

/** This subscription publishes all the clubs for all users to browse. */
Meteor.publish('Clubs', function publish() {
  if (this.userId) {
    return Clubs.find();
  }
  return this.ready();
});

Meteor.publish('Interests', function publish() {
  return Interests.find();
});
