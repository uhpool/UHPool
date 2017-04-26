import { Template } from 'meteor/templating';
import { AllListings } from '../../../api/all_listings/AllListingsCollection';

//Meteor.user().profile.name -- Get username (jsn9)

Template.MyListings_Page.onCreated(function onCreated() {
    this.subscribe('AllListingsCollection');
});

Template.MyListings_Page.helpers({
  userListings() {
      let user = Meteor.user().profile.name;
      return AllListings.find({username: user});
  },
});


