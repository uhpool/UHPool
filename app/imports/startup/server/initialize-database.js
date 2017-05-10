import { Meteor } from 'meteor/meteor';
import { Profiles } from '/imports/api/profile/ProfileCollection';
import { AllListings } from '/imports/api/all_listings/AllListingsCollection';
import { UserAcceptedListings } from '/imports/api/user_accepted_listings/UserAcceptedListingsCollection';
import { _ } from 'meteor/underscore';

/* global Assets */

/* eslint-disable no-console */

/**
 * Returns the definition array associated with collectionName in the restoreJSON structure.
 * @param restoreJSON The restore file contents.
 * @param collection The collection of interest.
 */
function getDefinitions(restoreJSON, collection) {
  return _.find(restoreJSON.collections, obj => obj.name === collection).contents;
}

/**
 * Given a collection and the restoreJSON structure, looks up the definitions and invokes define() on them.
 * @param collection The collection to be restored.
 * @param restoreJSON The structure containing all of the definitions.
 */
function restoreCollection(collection, restoreJSON) {
  const definitions = getDefinitions(restoreJSON, collection._collectionName);
  console.log(`Defining ${definitions.length} ${collection._collectionName} documents.`);
  _.each(definitions, definition => collection.define(definition));
}

Meteor.startup(() => {
  /** Only initialize database if it's empty. */
  const collectionList = [Profiles];
  const totalDocuments = _.reduce(collectionList, function reducer(memo, collection) {
    return memo + collection.count();
  }, 0);
  if (totalDocuments === 0) {
    const fileName = Meteor.settings.public.initialDatabaseFileName;
    console.log(`Restoring database from file ${fileName}.`);
    const restoreJSON = JSON.parse(Assets.getText(fileName));
    _.each(collectionList, collection => {
      restoreCollection(collection, restoreJSON);
    });
  }

  let username = 'quackdynasty';
  let usernameAccepted = 'testAccepted';
  let locationFrom = '0';
  let locationTo = '0';
  let day = '0';
  let startTime = '0';
  let endTime = '0';
  let statusIndicator = '0';

  let updatedListData = {
    username, usernameAccepted, locationFrom, locationTo, day, startTime, endTime,
    statusIndicator,
  };
  AllListings.insert(updatedListData);

  username = 'jsn9';
  usernameAccepted = 'quackdynasty';
  locationTo = '0';
  locationFrom = '1';
  day = '1';
  startTime = '3';
  endTime = '4';
  statusIndicator = '1';

  updatedListData = { username, usernameAccepted, locationFrom, locationTo, day, startTime, endTime, statusIndicator };
  AllListings.insert(updatedListData);

  if (UserAcceptedListings.find().count() === 0) {
    const usernameDriver = 'testDriver';
    const usernamePotentialPassenger = 'testPassenger';

    const ual = { usernameDriver, usernamePotentialPassenger };

    UserAcceptedListings.insert(ual);
  }
  console.log(UserAcceptedListings.find().fetch());
});
