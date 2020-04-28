import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { Stuffs } from '../../api/stuff/Stuff.js';
import { Clubs } from '../../api/club/Clubs';
import { Interests } from '../../api/interests/Interests';

/* eslint-disable no-console */

/** Initialize the database with a default data document. */
function addData(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Stuffs.insert(data);
}

/** Initialize the collection if empty. */
if (Stuffs.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    Meteor.settings.defaultData.map(data => addData(data));
  }
}

function addClubs(data) {
  console.log(`  Adding: ${data.clubName}`);
  Clubs.insert(data);
  data.interest.forEach(function (interest) {
    if (!(_.contains(_.pluck(Interests.find().fetch(), 'interest'), interest))) {
      Interests.insert({ interest: interest });
    }
  });
}

if (Clubs.find().count() === 0) {
  if (Meteor.settings.loadAssetsFile) {
    const assetFile = 'csvjson-modified.json';
    console.log(`Loading clubs from ${assetFile}`);
    const jsonData = JSON.parse(Assets.getText(assetFile));
    jsonData.map(data => addClubs(data));
  }
}
