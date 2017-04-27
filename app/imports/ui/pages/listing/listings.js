import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { _ } from 'meteor/underscore';
import { AllListings, AllListingsCollection } from '../../../api/all_listings/AllListingsCollection';
import { Profiles } from '../../../api/profile/ProfileCollection';
import { UserAcceptedListings, UserAcceptedListingsCollection } from '../../../api/user_accepted_listings/UserAcceptedListingsCollection';

import { FlowRouter } from 'meteor/kadira:flow-router';

//Meteor.user().profile.name -- Get username (jsn9)

const displayErrorMessages = 'displayErrorMessages';

Template.Listings_Page.onCreated(function onCreated() {
    this.subscribe('AllListingsCollection');
    //this.subscribe(Profiles.getPublicationName());
    //this.subscribe('UserAcceptedListingsCollection');
    this.messageFlags = new ReactiveDict();
    this.messageFlags.set(displayErrorMessages, false);
    this.context = AllListingsCollection.namedContext('Listings_Page');
});

Template.Listings_Page.helpers({
    userPendingListings() {
        const allThings = AllListings.find().fetch();
        let returnedThings = {};
        const user = Meteor.user().profile.name;
        for(let i = 0; i<allThings.length; i++) {
            //if true can continue because we aren't going to show the same user and is part of 'pending'
            if(allThings[i].username != user && allThings[i].statusIndicator == "1") {

            }
        }

        return returnedThings;
    },
    userAllListings() {
        const allThings = AllListings.find().fetch();
        let returnedThings = {};
        const user = Meteor.user().profile.name;
        for(let i = 0; i<allThings.length; i++) {
            if(allThings[i].username != user) { //can continue because we aren't going to show the same user

            }
        }

        return returnedThings;
    },
});

Template.Listings_Page.events({
  'submit .filter-data-form'(event, instance) {
    event.preventDefault();
    const selectedOptions = _.filter(event.target.Interests.selectedOptions, (option) => option.selected);
    instance.messageFlags.set(selectedInterestsKey, _.map(selectedOptions, (option) => option.value));
  },
});

