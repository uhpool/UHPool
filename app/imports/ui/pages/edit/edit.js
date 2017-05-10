import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { _ } from 'meteor/underscore';
import { Profiles } from '/imports/api/profile/ProfileCollection';

const displaySuccessMessage = 'displaySuccessMessage';
const displayErrorMessages = 'displayErrorMessages';


Template.Edit_Page.onCreated(function onCreated() {
  this.subscribe(Profiles.getPublicationName());
  this.messageFlags = new ReactiveDict();
  this.messageFlags.set(displaySuccessMessage, false);
  this.messageFlags.set(displayErrorMessages, false);
  this.context = Profiles.getSchema().namedContext('Edit_Page');
});

Template.Edit_Page.helpers({

  capacities() {
    return [
      { label: '1', value: 1 },
      { label: '2', value: 2 },
      { label: '3', value: 3 },
      { label: '4', value: 4 },
      { label: '5', value: 5 },
      { label: '6', value: 6 },
      { label: '7', value: 7 },
      { label: '8', value: 8 },
      { label: '9', value: 9 },
      { label: '10', value: 10 },
    ];
  },

  places() {
    return [
      { label: 'Aiea', value: 'aiea' },
      { label: 'Ewa Beach', value: 'ewaBeach' },
      { label: "Hale'iwa", value: 'haleiwa' },
      { label: "Hau'ula", value: 'hauula' },
      { label: 'Hawaii Kai', value: 'hawaiiKai' },
      { label: 'Honolulu', value: 'honolulu' },
      { label: "Ka'a'awa", value: 'kaaawa' },
      { label: 'Kahala', value: 'kahala' },
      { label: 'Kahuku', value: 'kahuku' },
      { label: 'Kailua', value: 'kailua' },
      { label: "Kane'ohe", value: 'kaneone' },
      { label: 'Kapolei', value: 'kapolei' },
      { label: "La'ie", value: 'laie' },
      { label: 'Lanikai', value: 'lanikai' },
      { label: "Ma'ili", value: 'maili' },
      { label: 'Makaha', value: 'makaha' },
      { label: 'Manoa', value: 'manoa' },
      { label: 'Mililani', value: 'mililani' },
      { label: 'Nana Kuli', value: 'nanaKuli' },
      { label: 'Pearl City', value: 'pearlCity' },
      { label: 'Wahiawa', value: 'wahiawa' },
      { label: "Wai'anae", value: 'waianae' },
      { label: 'Waikiki', value: 'waikiki' },
      { label: 'Waimanalo', value: 'waimanalo' },
      { label: 'Waipahu', value: 'waipahu' },
    ];
  },

  profile() {
    return Profiles.findDoc(FlowRouter.getParam('username'));
  },

  successClass() {
    return Template.instance().messageFlags.get(displaySuccessMessage) ? 'success' : '';
  },
  displaySuccessMessage() {
    return Template.instance().messageFlags.get(displaySuccessMessage);
  },
  errorClass() {
    return Template.instance().messageFlags.get(displayErrorMessages) ? 'error' : '';
  },
  fieldError(fieldName) {
    const invalidKeys = Template.instance().context.invalidKeys();
    const errorObject = _.find(invalidKeys, (keyObj) => keyObj.name === fieldName);
    return errorObject && Template.instance().context.keyErrorMessage(errorObject.name);
  },

});


Template.Edit_Page.events({
  'submit .edit-data-form'(event, instance) {
    event.preventDefault();
    const firstName = event.target.First.value;
    const lastName = event.target.Last.value;
    const username = FlowRouter.getParam('username'); // schema requires username.
    const picture = event.target.Picture.value;
    const bio = event.target.Bio.value;
    const location = event.target.Location.value;
    const vehicle = event.target.Vehicle.value;
    const capacity = event.target.Capacity.value;
    const vehiclePicture = event.target.VehiclePicture.value;

    const updatedProfileData = { firstName, lastName, picture, bio, username, location, vehicle, capacity,
    vehiclePicture };

    // Clear out any old validation errors.
    instance.context.resetValidation();
    // Invoke clean so that updatedProfileData reflects what will be inserted.
    Profiles.getSchema().clean(updatedProfileData);
    // Determine validity.
    instance.context.validate(updatedProfileData);

    if (instance.context.isValid()) {
      const docID = Profiles.findDoc(FlowRouter.getParam('username'))._id;
      const id = Profiles.update(docID, { $set: updatedProfileData });
      instance.messageFlags.set(displaySuccessMessage, id);
      instance.messageFlags.set(displayErrorMessages, false);
    } else {
      instance.messageFlags.set(displaySuccessMessage, false);
      instance.messageFlags.set(displayErrorMessages, true);
    }
  },
});
