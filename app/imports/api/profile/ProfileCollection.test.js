// /* eslint prefer-arrow-callback: "off", no-unused-expressions: "off" */
// /* eslint-env mocha */
//
// import { Profiles } from '/imports/api/profile/ProfileCollection';
// import { Interests } from '/imports/api/interest/InterestCollection';
// import { Meteor } from 'meteor/meteor';
// import { expect } from 'chai';
// import { removeAllEntities } from '/imports/api/base/BaseUtilities';
//
// if (Meteor.isServer) {
//   describe('ProfileCollection', function testSuite() {
//     const firstName = 'Dave';
//     const lastName = 'Walton';
//     const username = 'dwalton';
//     const bio = 'My Buick is from 1990.';
//     const picture = 'http://weknowyourdreams.com/images/face/face-03.jpg';
//     const location = 'Kailua';
//     const vehicle = 'Buick';
//     const capacity = 2;
//     const vehiclePicture = 'http://1.bp.blogspot.com/-M2dpTAqyRZU/TpBMhqL9B1I/AAAAAAAAAWM/LI7JR_c9r50/s1600/car+spy+photos+6.jpg';
//     const defineObject = { firstName, lastName, username, bio, picture, location, vehicle, capacity, vehiclePicture };
//
//     before(function setup() {
//       removeAllEntities();
//       // Define a sample interest.
//     });
//
//     after(function teardown() {
//       removeAllEntities();
//     });
//
//     it('#define, #isDefined, #removeIt, #dumpOne, #restoreOne', function test() {
//       let docID = Profiles.define(defineObject);
//       expect(Profiles.isDefined(docID)).to.be.true;
//       // Check that fields are available
//       const doc = Profiles.findDoc(docID);
//       expect(doc.firstName).to.equal(firstName);
//       expect(doc.lastName).to.equal(lastName);
//       expect(doc.username).to.equal(username);
//       expect(doc.bio).to.equal(bio);
//       expect(doc.picture).to.equal(picture);
//       expect(doc.location).to.equal(location);
//       expect(doc.vehicle).to.equal(vehicle);
//       expect(doc.capacity).to.equal(capacity);
//       expect(doc.vehiclePicture).to.equal(vehiclePicture);
//       // Check that multiple definitions with the same email address fail
//       expect(function foo() { Profiles.define(defineObject); }).to.throw(Error);
//       // Check that we can dump and restore a Profile.
//       const dumpObject = Profiles.dumpOne(docID);
//       Profiles.removeIt(docID);
//       expect(Profiles.isDefined(docID)).to.be.false;
//       docID = Profiles.restoreOne(dumpObject);
//       expect(Profiles.isDefined(docID)).to.be.true;
//       Profiles.removeIt(docID);
//     });
//   });
// }

