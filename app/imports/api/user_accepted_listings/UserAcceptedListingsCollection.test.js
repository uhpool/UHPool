/* eslint prefer-arrow-callback: "off", no-unused-expressions: "off" */
/* eslint-env mocha */

import { UserAcceptedListings } from '/imports/api/user_accepted_listings/UserAcceptedListingsCollection';
import { Meteor } from 'meteor/meteor';
import { expect } from 'chai';
import { removeAllEntities } from '/imports/api/base/BaseUtilities';

if (Meteor.isServer) {
  describe('UserAcceptedListingsCollection', function testSuite() {
    const userDriver = 'jsn9';
    const userPotentialPass = 'Bob';
    const defineObject = { userDriver, userPotentialPass };

    after(function teardown() {
      removeAllEntities();
    });

    it('#define, #isDefined, #removeIt, #dumpOne, #restoreOne', function test() {
      let docID = UserAcceptedListings.define(defineObject);
      expect(UserAcceptedListings.isDefined(docID)).to.be.true;
      // Check that fields are available
      const doc = UserAcceptedListings.findDoc(docID);
      expect(doc.usernameDriver).to.equal(userDriver);
      expect(doc.usernamePotentialPassenger).to.equal(userPotentialPass);
      // Check that multiple definitions with the same email address fail
      expect(function foo() { UserAcceptedListings.define(defineObject); }).to.throw(Error);
      // Check that we can dump and restore a Profile.
      const dumpObject = UserAcceptedListings.dumpOne(docID);
      UserAcceptedListings.removeIt(docID);
      expect(UserAcceptedListings.isDefined(docID)).to.be.false;
      docID = UserAcceptedListings.restoreOne(dumpObject);
      expect(UserAcceptedListings.isDefined(docID)).to.be.true;
      UserAcceptedListings.removeIt(docID);
    });
  });
}

