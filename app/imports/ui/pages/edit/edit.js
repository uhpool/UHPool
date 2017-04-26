import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { _ } from 'meteor/underscore';
import { Profiles } from '/imports/api/profile/ProfileCollection';
import { places } from '/imports/api/places/PlacesCollection';

 const selectedPlacesKey = 'selectedPlaces';

Template.Edit_Page.onCreated(function onCreated() {
  this.subscribe(Places.getPublicationName());
  this.subscribe(Profiles.getPublicationName());
  this.messageFlags = new ReactiveDict();
  this.messageFlags.set(selectedPlacesKey, undefined);
});

Template.Edit_Page.helpers({
  profiles() {
    // Initialize selectedInterests to all of them if messageFlags is undefined.
    // if (!Template.instance().messageFlags.get(selectedInterestsKey)) {
    //   Template.instance().messageFlags.set(selectedInterestsKey, _.map(Interests.findAll(), interest => interest.name));
    // }
    // Find all profiles with the currently selected interests.
    const allProfiles = Profiles.findAll();
    // const selectedInterests = Template.instance().messageFlags.get(selectedInterestsKey);
    // return _.filter(allProfiles, profile => _.intersection(profile.interests, selectedInterests).length > 0);
  },

  places() {
    return _.map(Places.findAll(),
          function makePlaceObject() {
            return {
              label: place.name,
              selected: _.contains(Template.instance().messageFlags.get(selectedPlacesKey), place.name),
            }
          })
  },
});

// Template.Edit_Page.events({
//   'submit .filter-data-form'(event, instance) {
//     event.preventDefault();
//     const selectedOptions = _.filter(event.target.Interests.selectedOptions, (option) => option.selected);
//     instance.messageFlags.set(selectedInterestsKey, _.map(selectedOptions, (option) => option.value));
//   },
// });

