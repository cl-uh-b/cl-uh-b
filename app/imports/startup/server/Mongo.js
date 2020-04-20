import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff/Stuff.js';
import { Clubs } from '../../api/club/Club';

/* eslint-disable no-console */

/** Initialize the database with a default data document. */
function addData(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Stuffs.insert(data);
}

function addClubs(data) {
  console.log(`  Adding: ${data.clubName}`);
  Clubs.insert(data);

  }

/** Initialize the collection if empty. */
if (Stuffs.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    Meteor.settings.defaultData.map(data => addData(data));
  }
}

if (Meteor.settings.loadAssetsFile) {
  const assetFile = 'csvjson-modified.json';
  console.log(`Loading clubs from ${assetFile}`);
  const jsonData = JSON.parse(Assets.getText(assetFile));
  jsonData.map(data => addClubs(data));
}
