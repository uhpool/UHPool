/* eslint prefer-arrow-callback: "off", no-unused-expressions: "off" */
/* eslint-env mocha */

import { UserAcceptedListings } from '/imports/api/all_listings/AllListingsCollection';
import { Meteor } from 'meteor/meteor';
import { expect } from 'chai';
import { removeAllEntities } from '/imports/api/base/BaseUtilities';

if (Meteor.isServer) {
  describe('AllListingsCollection', function testSuite() {
    const user = 'jsn9';
    const loc = 'Manoa';
    const day = 'Monday';
    const start = Date.now;
    const end = Date.now;
    const stat = {};
    const defineObject = { user, loc, day, start, end, stat };

    after(function teardown() {
      removeAllEntities();
    });

    it('#define, #isDefined, #removeIt, #dumpOne, #restoreOne', function test() {
      let docID = AllListings.define(defineObject);
      expect(AllListings.isDefined(docID)).to.be.true;
          // Check that fields are available
      const doc = AllListings.findDoc(docID);
      expect(doc.username).to.equal(user);
      expect(doc.location).to.equal(loc);
      expect(doc.location).to.equal(day);
      expect(doc.location).to.equal(start);
      expect(doc.location).to.equal(end);
      expect(doc.location).to.equal(stat);
          // Check that multiple definitions with the same email address fail
      expect(function foo() { AllListings.define(defineObject); }).to.throw(Error);
          // Check that we can dump and restore a Profile.
      const dumpObject = UserAcceptedListings.dumpOne(docID);
      AllListings.removeIt(docID);
      expect(AllListings.isDefined(docID)).to.be.false;
      docID = AllListings.restoreOne(dumpObject);
      expect(AllListings.isDefined(docID)).to.be.true;
      AllListings.removeIt(docID);
    });
  });
}

