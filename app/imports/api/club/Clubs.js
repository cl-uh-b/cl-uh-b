import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Define a Mongo collection to hold the data. */
const Clubs = new Mongo.Collection('Clubs');

/** Define a schema to specify the structure of each document in the collection. */
const ClubSchema = new SimpleSchema({
  clubName: String,
  interest: { type: Array, optional: true },
  'interest.$': String,
  description: {
    type: String,
    optional: true,
    defaultValue: '' },
  favoritesCount: Number,
  contact: String,
  email: String,
  image: { type: String,
    optional: true,
    defaultValue: 'https://manoa.hawaii.edu/admissions/images/stacked.png' },
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Clubs.attachSchema(ClubSchema);

/** Make the collection and schema available to other code. */
export { Clubs, ClubSchema };
