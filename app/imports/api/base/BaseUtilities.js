import { Profiles } from '/imports/api/profile/ProfileCollection';
import { Interests } from '/imports/api/interest/InterestCollection';
//import { UserAcceptedListings } from '/imports/api/user_accepted_listings/UserAcceptedListingsCollection';

export function removeAllEntities() {
  Profiles.removeAll();
  Interests.removeAll();
}
