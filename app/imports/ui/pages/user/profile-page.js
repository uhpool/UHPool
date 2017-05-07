import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { _ } from 'meteor/underscore';
import { AllListings, AllListingsCollection } from '../../../api/all_listings/AllListingsCollection';
import { Profiles } from '../../../api/profile/ProfileCollection';
import { UserAcceptedListings, UserAcceptedListingsCollection } from '../../../api/user_accepted_listings/UserAcceptedListingsCollection';

import { FlowRouter } from 'meteor/kadira:flow-router';

//Meteor.user().profile.name -- Get username (jsn9)

const displayErrorMessages = 'displayErrorMessages';

Template.Profile_Page.onCreated(function onCreated() {
    this.subscribe('AllListingsCollection');
    this.subscribe(Profiles.getPublicationName());
    this.subscribe('UserAcceptedListingsCollection');
    this.messageFlags = new ReactiveDict();
    this.messageFlags.set(displayErrorMessages, false);
    this.context = AllListingsCollection.namedContext('Listings_Page');
});

Template.Profile_Page.helpers({

  profile() {
    return Profiles.findDoc(FlowRouter.getParam('username'));
  },

  routeUserName() {
    return FlowRouter.getParam('username');
  },
    userWhoAcceptedTheirListing() {
        //if the user has listings and if any one of those indicators show as '1', show them and show who accepted it
        const allThings = AllListings.find().fetch();
        let returnedThings = [];
        const user = Meteor.user().profile.name;
        for(let i = 0; i<allThings.length; i++) {
            //if true can continue because we aren't going to show the same user and is part of 'pending'
            if(allThings[i].username == user && allThings[i].statusIndicator == "1") {
                const one = Profiles.findDoc(allThings[i].usernameAccepted);
                const locs = [ { label: "Aiea", value: "0" },
                    { label: "Ewa Beach", value: "1" },
                    { label: "Hale'iwa", value: "2" },
                    { label: "Hau'ula", value: "3" },
                    { label: "Hawaii Kai", value: "4" },
                    { label: "Honolulu", value: "5" },
                    { label: "Ka'a'awa", value: "6" },
                    { label: "Kahala", value: "7" },
                    { label: "Kahuku", value: "8" },
                    { label: "Kailua", value: "9" },
                    { label: "Kane'ohe", value: "10" },
                    { label: "Kapolei", value: "11" }];
                const times = [ { label: "04:00", value: "0" },
                    { label: "05:00", value: "1" },
                    { label: "06:00", value: "2" },
                    { label: "07:00", value: "3" },
                    { label: "08:00", value: "4" },
                    { label: "09:00", value: "5" },
                    { label: "10:00", value: "6" },
                    { label: "11:00", value: "7" },
                    { label: "12:00", value: "8" },
                    { label: "13:00", value: "9" },
                    { label: "14:00", value: "10" },
                    { label: "15:00", value: "11" },
                    { label: "16:00", value: "12" },
                    { label: "17:00", value: "13" },
                    { label: "18:00", value: "14" }];
                const days = [ { label: "Sunday", value: "0" },
                    { label: "Monday", value: "1" },
                    { label: "Tuesday", value: "2" },
                    { label: "Wednesday", value: "3" },
                    { label: "Thursday", value: "4" },
                    { label: "Friday", value: "5" },
                    { label: "Saturday", value: "6" }];
                ///////////
                const name = one.firstName + ' ' + one.lastName;
                const id = allThings[i]._id;
                let locationFrom = '';
                let locationTo = '';
                let startTime = '';
                let endTime = '';
                let day = '';
                for(let j = 0; j<locs.length; j++) {
                    if(locs[j].value == allThings[i].locationFrom) {
                        locationFrom = locs[j].label;
                    }
                    if(locs[j].value == allThings[i].locationTo) {
                        locationTo = locs[j].label;
                    }
                }
                for(let j = 0; j<times.length; j++) {
                    if(times[j].value == allThings[i].startTime) {
                        startTime = times[j].label;
                    }
                    if(times[j].value == allThings[i].endTime) {
                        endTime = times[j].label;
                    }
                }
                for(let j = 0; j<days.length; j++) {
                    if(days[j].value == allThings[i].day) {
                        day = days[j].label;
                    }
                }

                const full = {id: id, name: name, locationFrom: locationFrom, locationTo: locationTo, startTime: startTime, endTime: endTime, day: day};
                returnedThings.push(full);
            }
        }
        console.log(returnedThings);
        return returnedThings;
    },
    userWhoHasBeenAccepted() { //this is the one that shows which potential passengers are no longer 'potential'
//if the user has listings and if any one of those indicators show as '1', show them and show who accepted it
        const allThings = AllListings.find().fetch();
        let returnedThings = [];
        const user = Meteor.user().profile.name;
        for(let i = 0; i<allThings.length; i++) {
            //if true can continue because we aren't going to show the same user and is part of 'pending'
            if(allThings[i].username == user && allThings[i].statusIndicator == "2") {
                const one = Profiles.findDoc(allThings[i].usernameAccepted);
                const locs = [ { label: "Aiea", value: "0" },
                    { label: "Ewa Beach", value: "1" },
                    { label: "Hale'iwa", value: "2" },
                    { label: "Hau'ula", value: "3" },
                    { label: "Hawaii Kai", value: "4" },
                    { label: "Honolulu", value: "5" },
                    { label: "Ka'a'awa", value: "6" },
                    { label: "Kahala", value: "7" },
                    { label: "Kahuku", value: "8" },
                    { label: "Kailua", value: "9" },
                    { label: "Kane'ohe", value: "10" },
                    { label: "Kapolei", value: "11" }];
                const times = [ { label: "04:00", value: "0" },
                    { label: "05:00", value: "1" },
                    { label: "06:00", value: "2" },
                    { label: "07:00", value: "3" },
                    { label: "08:00", value: "4" },
                    { label: "09:00", value: "5" },
                    { label: "10:00", value: "6" },
                    { label: "11:00", value: "7" },
                    { label: "12:00", value: "8" },
                    { label: "13:00", value: "9" },
                    { label: "14:00", value: "10" },
                    { label: "15:00", value: "11" },
                    { label: "16:00", value: "12" },
                    { label: "17:00", value: "13" },
                    { label: "18:00", value: "14" }];
                const days = [ { label: "Sunday", value: "0" },
                    { label: "Monday", value: "1" },
                    { label: "Tuesday", value: "2" },
                    { label: "Wednesday", value: "3" },
                    { label: "Thursday", value: "4" },
                    { label: "Friday", value: "5" },
                    { label: "Saturday", value: "6" }];
                ///////////
                const name = one.firstName + ' ' + one.lastName;
                const id = allThings[i]._id;
                let locationFrom = '';
                let locationTo = '';
                let startTime = '';
                let endTime = '';
                let day = '';
                for(let j = 0; j<locs.length; j++) {
                    if(locs[j].value == allThings[i].locationFrom) {
                        locationFrom = locs[j].label;
                    }
                    if(locs[j].value == allThings[i].locationTo) {
                        locationTo = locs[j].label;
                    }
                }
                for(let j = 0; j<times.length; j++) {
                    if(times[j].value == allThings[i].startTime) {
                        startTime = times[j].label;
                    }
                    if(times[j].value == allThings[i].endTime) {
                        endTime = times[j].label;
                    }
                }
                for(let j = 0; j<days.length; j++) {
                    if(days[j].value == allThings[i].day) {
                        day = days[j].label;
                    }
                }

                const full = {id: id, name: name, locationFrom: locationFrom, locationTo: locationTo, startTime: startTime, endTime: endTime, day: day};
                returnedThings.push(full);
            }
        }
        console.log(returnedThings);
        return returnedThings;
    },
    userHasAcceptedThePendingOne() { //This is the #if for if the user has accepted a potential passenger's pending listing
        const allThings = AllListings.find().fetch();
        let returnedThings = [];
        const user = Meteor.user().profile.name;
        for(let i = 0; i<allThings.length; i++) {
            if(allThings[i].statusIndicator == "2" && allThings[i].username == user) {
                return 1;
            }
        }
    },
    hasUserWhoAcceptedTheirListing() {//This is the #if for if the user has not yet accepted a potential passenger's pending listing; just return anything if allThings.length > 0
        const allThings = AllListings.find().fetch();
        let returnedThings = [];
        const user = Meteor.user().profile.name;
        console.log("inside hasUserWhoAccepted");
        for(let i = 0; i<allThings.length; i++) {
            console.log(allThings[i]);
            if(allThings[i].statusIndicator == "1" && allThings[i].username == user) {
                console.log("exiting hasUserWhoAccepted");
                return 1;
            }
        }
    }
    ,
});

Template.Profile_Page.events({
    "click [data-action='task/accept']"(event, i) {
        const id = $(event.target).attr("href");
        AllListings.update({_id: id}, { $set: {statusIndicator: "2"} }); //Status indicator 2 will prevent it from showing for all users (2 = accepted)
        console.log(AllListings.find().fetch());
    },
    "click [data-action='task/deny']"(event, i) {
        const id = $(event.target).attr("href");
        AllListings.update({_id: id}, { $set: {statusIndicator: "0"} }); //Set it back so it's acceptable
    },
    "click [data-action='task/cancel']"(event, i) {
        const id = $(event.target).attr("href");
        AllListings.update({_id: id}, { $set: {statusIndicator: "0"} }); //Set it back so it's acceptable
    },
});
