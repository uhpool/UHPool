import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import BaseCollection from '/imports/api/base/BaseCollection';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';

/** @module Profile */

/**
 * Profiles provide portfolio data for a user.
 * @extends module:Base~BaseCollection
 */
class ProfileCollection extends BaseCollection {

  /**
   * Creates the Profile collection.
   */
  constructor() {
    super('Profile', new SimpleSchema({
      username: { type: String, optional: false },
      firstName: { type: String, optional: true },
      lastName: { type: String, optional: true },
      bio: { type: String, optional: true },
      picture: { type: SimpleSchema.RegEx.Url, optional: true },
      location: { type: String, optional: true },
      vehicle: { type: String, optional: true },
      capacity: { type: Number, optional: true },
      vehiclePicture: { type: SimpleSchema.RegEx.Url, optional: true },
    }));
  }

  /**
   * Defines a new Profile.
   * @example
   * Profiles.define({ firstName: 'Dave',
   *                   lastName: 'Walton',
   *                   username: 'dwalton',
   *                   bio: 'I love carpooling.',
   *                   picture: 'http://weknowyourdreams.com/images/face/face-03.jpg',
   *                   location: 'Kailua',
   *                   vehicle: 'Buick'
   *                   capacity: 2,
   *                   vehiclePicture: 'http://1.bp.blogspot.com/-M2dpTAqyRZU/TpBMhqL9B1I/AAAAAAAAAWM/LI7JR_c9r50/s1600/car+spy+photos+6.jpg',
   * @param { Object } description Object with required key username.
   * Username must be unique for all users. It should be the UH email account.
   * @throws { Meteor.Error } If a user with the supplied username already exists, or
   * if one or more interests are not defined, or if github, facebook, and instagram are not URLs.
   * @returns The newly created docID.
   */
  define({
      firstName = '', lastName = '', username, bio = '', picture = '', location = '', vehicle = '',
      capacity = 0, vehiclePicture = '',
  }) {
    // make sure required fields are OK.
    const checkPattern = {
      firstName: String, lastName: String, username: String, bio: String, picture: String,
      location: String, vehicle: String, capacity: Number, vehiclePicture: String,
    };
    check({ firstName, lastName, username, bio, picture, location, vehicle, capacity, vehiclePicture }, checkPattern);

    if (this.find({ username }).count() > 0) {
      throw new Meteor.Error(`${username} is previously defined in another Profile`);
    }

    // Throw an error if any of the passed Interest names are not defined.
    return this._collection.insert({
      firstName, lastName, username, bio, picture, location, vehicle,
      capacity, vehiclePicture,
    });
  }

  /**
   * Returns an object representing the Profile docID in a format acceptable to define().
   * @param docID The docID of a Profile.
   * @returns { Object } An object representing the definition of docID.
   */
  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const firstName = doc.firstName;
    const lastName = doc.lastName;
    const username = doc.username;
    const bio = doc.bio;
    const picture = doc.picture;
    const location = doc.location;
    const vehicle = doc.vehicle;
    const capacity = doc.capacity;
    const vehiclePicture = doc.vehiclePicture;
    return { firstName, lastName, username, bio, picture, location, vehicle, capacity, vehiclePicture };
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const Profiles = new ProfileCollection();
