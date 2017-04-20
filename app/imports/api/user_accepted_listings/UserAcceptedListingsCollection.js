import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import BaseCollection from '/imports/api/base/BaseCollection';
import { Interests } from '/imports/api/interest/InterestCollection';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';

/** @module Profile */

/**
 * Profiles provide portfolio data for a user.
 * @extends module:Base~BaseCollection
 */
class UserAcceptedListingsCollection extends BaseCollection {

  /**
   * Creates the Profile collection.
   */
  constructor() {
    super('UserAcceptedListingsCollection', new SimpleSchema({
        usernameDriver: { type: String },
        usernamePotentialPassenger: {type: String},
    }));
  }

  /**
   * Defines a new Profile.
   * @example
   * Profiles.define({ firstName: 'Philip',
   *                   lastName: 'Johnson',
   *                   username: 'johnson',
   *                   bio: 'I have been a professor of computer science at UH since 1990.',
   *                   interests: ['Application Development', 'Software Engineering', 'Databases'],
   *                   title: 'Professor of Information and Computer Sciences',
   *                   picture: 'http://philipmjohnson.org/headshot.jpg',
   *                   github: 'https://github.com/philipmjohnson',
   *                   facebook: 'https://facebook.com/philipmjohnson',
   *                   instagram: 'https://instagram.com/philipmjohnson' });
   * @param { Object } description Object with required key username.
   * Remaining keys are optional.
   * Username must be unique for all users. It should be the UH email account.
   * Interests is an array of defined interest names.
   * @throws { Meteor.Error } If a user with the supplied username already exists, or
   * if one or more interests are not defined, or if github, facebook, and instagram are not URLs.
   * @returns The newly created docID.
   */
  define({ usernameDriver = '', usernamePotentialPassenger = '' }) {
    // make sure required fields are OK.
    const checkPattern = { usernameDriver: String, usernamePotentialPassenger: String };
    check({ usernameDriver, usernamePotentialPassenger }, checkPattern);

    if (this.find({ usernameDriver }).count() > 0) {
      throw new Meteor.Error(`${usernameDriver} is previously defined in another Profile`);
    }

    return this._collection.insert({ usernameDriver, usernamePotentialPassenger });
  }

  /**
   * Returns an object representing the Profile docID in a format acceptable to define().
   * @param docID The docID of a Profile.
   * @returns { Object } An object representing the definition of docID.
   */
  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const usernameDriver = doc.usernameDriver;
    const usernamePotentialPassenger = doc.usernamePotentialPassenger;
    return { usernameDriver, usernamePotentialPassenger };
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const UserAcceptedListings = new UserAcceptedListingsCollection();
