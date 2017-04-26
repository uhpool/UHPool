import { Interests } from '/imports/api/interest/InterestCollection';
import { Profiles } from '/imports/api/profile/ProfileCollection';
import { Places } from '/imports/api/place/PlaceCollection';

Interests.publish();
Profiles.publish();
Places.publish();
