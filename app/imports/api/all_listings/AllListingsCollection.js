import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import BaseCollection from '/imports/api/base/BaseCollection';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';

/** @module Profile */

/**
 * Profiles provide portfolio data for a user.
 * @extends module:Base~BaseCollection
 */
class AllListingsCollection extends BaseCollection {

  /**
   * Creates the Profile collection.
   */
  constructor() {
    super('AllListingsCollection', new SimpleSchema({
        username: { type: String },
        location: {type: String},
        day: {type: String},
        startTime: {type: Date},
        endTime: {type: Date},
        statusIndicator: {type: String},
    }));
  }

  define({ username = '', location = '', day = '', startTime = '', endTime = '', statusIndicator = '' }) {
    // make sure required fields are OK.
    const checkPattern = { username: String, location: String, day: String, startTime: Date, endTime: Date, statusIndicator: String};
    check({ username, location, day, startTime, endTime, statusIndicator }, checkPattern);

    if (this.find({ username }).count() > 0) {
      throw new Meteor.Error(`${username} is previously defined in another Profile`);
    }

    return this._collection.insert({ username, location, day, startTime, endTime, statusIndicator });
  }

  /**
   * Returns an object representing the Profile docID in a format acceptable to define().
   * @param docID The docID of a Profile.
   * @returns { Object } An object representing the definition of docID.
   */
  dumpOne(docID) {
      const doc = this.findDoc(docID);
      const user = doc.username;
      const loc = doc.location;
      const day = doc.day;
      const start = doc.startTime;
      const end = doc.endTime;
      const stat = doc.statusIndicator;
    return { user, loc, day, start, end, stat };
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const AllListings = new AllListingsCollection();
