import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import BaseCollection from '/imports/api/base/BaseCollection';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

/* eslint-disable object-shorthand */

export const UserAcceptedListings = new Mongo.Collection('UserAcceptedListingsCollection');

export const UserAcceptedListingsCollection = new SimpleSchema({
  usernameDriver: { type: String },
  usernamePotentialPassenger: { type: String },
});

UserAcceptedListings.attachSchema(UserAcceptedListingsCollection);
