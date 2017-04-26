import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import BaseCollection from '/imports/api/base/BaseCollection';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';

/** @module Place */

/**
 * Represents a specific place on Oahu".
 * @extends module:Base~BaseCollection
 */
class PlaceCollection extends BaseCollection {

  /**
   * Creates the Place collection.
   */
  constructor() {
    super('Place', new SimpleSchema({
      name: { type: String },
      description: { type: String, optional: true },
    }));
  }

  /**
   * Defines a new Place.
   * @example
   * Places.define({ name: 'Kailua'});
   * @param { Object } description Object with key name.
   * Name must be previously undefined.
   * Creates a "slug" for this name and stores it in the slug field.
   * @throws {Meteor.Error} If the place definition includes a defined name.
   * @returns The newly created docID.
   */
  define({ name }) {
    check(name, String);
    if (this.find({ name }).count() > 0) {
      throw new Meteor.Error(`${name} is previously defined in another Place`);
    }
    return this._collection.insert({ name });
  }

  /**
   * Returns the Place name corresponding to the passed place docID.
   * @param placeID a place docID.
   * @returns { String } A place name.
   * @throws { Meteor.Error} If the place docID cannot be found.
   */
  findName(placeID) {
    this.assertDefined(placeID);
    return this.findDoc(placeID).name;
  }

  /**
   * Returns a list of Place names corresponding to the passed list of Place docIDs.
   * @param placeIDs A list of Place docIDs.
   * @returns { Array }
   * @throws { Meteor.Error} If any of the instanceIDs cannot be found.
   */
  findNames(placeIDs) {
    return placeIDs.map(placeID => this.findName(placeID));
  }

  /**
   * Throws an error if the passed name is not a defined Place name.
   * @param name The name of a place.
   */
  assertName(name) {
    this.findDoc(name);
  }

  /**
   * Throws an error if the passed list of names are not all Place names.
   * @param names An array of (hopefully) Place names.
   */
  assertNames(names) {
    _.each(names, name => this.assertName(name));
  }

  /**
   * Returns the docID associated with the passed Place name, or throws an error if it cannot be found.
   * @param { String } name a place name.
   * @returns { String } The docID associated with the name.
   * @throws { Meteor.Error } If name is not associated with a Place.
   */
  findID(name) {
    return (this.findDoc(name)._id);
  }

  /**
   * Returns the docIDs associated with the array of Place names, or throws an error if any name cannot be found.
   * If nothing is passed, then an empty array is returned.
   * @param { String[] } names An array of place names.
   * @returns { String[] } The docIDs associated with the names.
   * @throws { Meteor.Error } If any instance is not a Place name.
   */
  findIDs(names) {
    return (names) ? names.map((instance) => this.findID(instance)) : [];
  }

  /**
   * Returns an object representing the Place docID in a format acceptable to define().
   * @param docID The docID of a Place.
   * @returns { Object } An object representing the definition of docID.
   */
  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const name = doc.name;
    const description = doc.description;
    return { name, description };
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const Places = new PlaceCollection();
