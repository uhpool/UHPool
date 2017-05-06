import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Profiles } from '/imports/api/profile/ProfileCollection';


Template.Profile_Page.onCreated(function onCreated() {
  this.subscribe(Profiles.getPublicationName());
});

Template.Profile_Page.helpers({

  profile() {
    return Profiles.findDoc(FlowRouter.getParam('username'));
  },

  routeUserName() {
    return FlowRouter.getParam('username');
  },
    userWhoAcceptedTheirListing() {

    },
    userWhoHasBeenAccepted() {

    },
    hasUserWhoAcceptedTheirListing() {
      //if the user has listings and if any one of those indicators show as '1', show them and show who accepted it
    },
});

Template.Listings_Page.events({
    "click [data-action='task/accept']"(event, i) {
        const id = $(event.target).attr("href");
        AllListings.update({_id: id}, { $set: {statusIndicator: "2"} }); //Status indicator 2 will prevent it from showing for all users (2 = accepted)
        console.log(AllListings.find().fetch());
    },
    "click [data-action='task/deny']"(event, i) {
        // delete the task
        const id = $(event.target).attr("href");
        AllListings.update({_id: id}, { $set: {statusIndicator: "0"} }); //Set it back so it's acceptable
    },
});
