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
});

