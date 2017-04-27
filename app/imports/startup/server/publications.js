import { Interests } from '/imports/api/interest/InterestCollection';
import { Profiles } from '/imports/api/profile/ProfileCollection';
import { AllListings } from '/imports/api/all_listings/AllListingsCollection';
import { UserAcceptedListings } from '/imports/api/user_accepted_listings/UserAcceptedListingsCollection';
import { Meteor } from 'meteor/meteor';

Interests.publish();
Profiles.publish();

Meteor.publish('AllListingsCollection', function publishAllListingData() {
    return AllListings.find();
});

Meteor.publish('UserAcceptedListingsCollection', function publishListingData() {
    return UserAcceptedListings.find();
});
