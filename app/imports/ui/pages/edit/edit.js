import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { _ } from 'meteor/underscore';
import { Places } from '/imports/api/places/PlacesCollection';
import { Profiles } from '/imports/api/profile/ProfileCollection';

Template.Edit_Page.onCreated(function onCreated() {
  this.subscribe(Places.getPublicationName());
  this.messageFlags = new ReactiveDict();
  this.messageFlags.set(selectedPlacesKey, undefined);
});

Template.Edit_Page.helpers({

  profiles() {
     return Profiles.findAll();
  },

  places() {
    return _.map(Places.findAll(),
          function makePlaceObject() {
            return {
              label: place.name,
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

