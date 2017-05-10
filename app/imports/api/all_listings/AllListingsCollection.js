import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

/* eslint-disable object-shorthand */

export const AllListings = new Mongo.Collection('AllListingsCollection');

/**
 * Create the schema for Stuff
 */
export const AllListingsCollection = new SimpleSchema({
  username: { type: String },
  usernameAccepted: { type: String },
  locationFrom: { type: String },
  locationTo: { type: String },
  day: { type: String },
  startTime: { type: String },
  endTime: { type: String },
  statusIndicator: { type: String },
});

AllListings.attachSchema(AllListingsCollection);

/** @module Profile */
