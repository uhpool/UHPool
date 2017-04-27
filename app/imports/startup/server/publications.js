import { Interests } from '/imports/api/interest/InterestCollection';
import { Profiles } from '/imports/api/profile/ProfileCollection';
import { AllListings } from '/imports/api/all_listings/AllListingsCollection';
import { Meteor } from 'meteor/meteor';

Interests.publish();
Profiles.publish();

Meteor.publish('AllListingsCollection', function publishListingData() {
    return AllListings.find();
});
