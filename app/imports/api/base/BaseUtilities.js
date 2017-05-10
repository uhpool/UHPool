import { Profiles } from '/imports/api/profile/ProfileCollection';
// import { UserAcceptedListings } from '/imports/api/user_accepted_listings/UserAcceptedListingsCollection';

export function removeAllEntities() {
  Profiles.removeAll();
}
