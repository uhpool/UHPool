import { Meteor } from 'meteor/meteor';
import { Profiles } from '/imports/api/profile/ProfileCollection';
import { Interests } from '/imports/api/interest/InterestCollection';
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
  const collectionList = [Interests, Profiles];
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

    const username = "test";
    const locationFrom = "0";
    const locationTo = "0";
    const day = "0";
    const startTime = "0";
    const endTime = "0";
    const statusIndicator = "0";

    const updatedListData = { username, locationFrom, locationTo, day, startTime, endTime, statusIndicator };

    if (AllListings.find().count() === 0) {
        AllListings.insert(updatedListData);
    }

    if(UserAcceptedListings.find().count() === 0) {
        const usernameDriver = 'testDriver';
        const usernamePotentialPassenger = 'testPassenger';

        const ual = { usernameDriver, usernamePotentialPassenger };

        UserAcceptedListings.insert(ual);
    }
    console.log(UserAcceptedListings.find().fetch());
});
