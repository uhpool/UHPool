import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { AllListings, AllListingsCollection } from '../../../api/all_listings/AllListingsCollection';
import { FlowRouter } from 'meteor/kadira:flow-router';

//Meteor.user().profile.name -- Get username (jsn9)

const displayErrorMessages = 'displayErrorMessages';

Template.MyListings_Page.onCreated(function onCreated() {
    this.subscribe('AllListingsCollection');
    this.messageFlags = new ReactiveDict();
    this.messageFlags.set(displayErrorMessages, false);
    this.context = AllListingsCollection.namedContext('MyListings_Page');
});

Template.MyListings_Page.helpers({
  userListings() {
      let user = Meteor.user().profile.name;
      return AllListings.find({username: user});
  },
    saveMe() {
        return [ { label: "Aiea", value: "0" },
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
    },
    selectDay() {
      return [ { label: "Sunday", value: "0" },
          { label: "Monday", value: "1" },
          { label: "Tuesday", value: "2" },
          { label: "Wednesday", value: "3" },
          { label: "Thursday", value: "4" },
          { label: "Friday", value: "5" },
          { label: "Saturday", value: "6" }];
    },
    selectTime() {
      return [
          { label: "04:00", value: "0" },
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
    },
    routeUserName() {
        return FlowRouter.getParam('username');
    },
});

Template.MyListings_Page.events({
    "click [data-action='task/delete']"(event, i) {
        // delete the task
        const id = $(event.target).attr("href");
        if(confirm("Do you really want to delete this entry?")) {
            console.log(id);
            AllListings.remove(id);
        }
    },
    'submit .list-data-form'(event, instance) {
        event.preventDefault();
        const username = Meteor.user().profile.name;
        for(let i = 0; i<event.target.locationFrom.length; i++) {
            const id = $(event.target.locationFrom[i]).attr("href");
            console.log(id);
            const locationFrom = event.target.locationFrom[i].value;
            const locationTo = event.target.locationTo[i].value;
            const day = event.target.day[i].value;
            const startTime = event.target.startTime[i].value;
            const endTime = event.target.endTime[i].value;
            const statusIndicator = AllListings.findOne({_id: id}).statusIndicator;
            console.log(event.target.locationFrom);
            const updatedListData = { username, locationFrom, locationTo, day, startTime, endTime, statusIndicator };
            console.log(updatedListData);
            // Clear out any old validation errors.
            instance.context.resetValidation();
            // Invoke clean so that newStudentData reflects what will be inserted.
            AllListingsCollection.clean(updatedListData);
            // Determine validity.
            instance.context.validate(updatedListData);
            if (instance.context.isValid()) {
                AllListings.update({_id: id}, { $set: updatedListData }, function(error, affectedDocs) {
                    if (error) {
                        throw new Meteor.Error(500, error.message);
                    } else {
                        return "Update Successful";
                    }
                });
                console.log(AllListings.findOne({_id: id}));
                instance.messageFlags.set(displayErrorMessages, false);
            } else {
                instance.messageFlags.set(displayErrorMessages, true);
                alert("error");
            }
        }
    },
    'click .add'(event, instance) {
        event.preventDefault();
        // Get name (text field)
        const username = Meteor.user().profile.name;
        const locationFrom = "0";
        const locationTo = "0";
        const day = "0";
        const startTime = "0";
        const endTime = "0";
        const statusIndicator = "0";

        const updatedListData = { username, locationFrom, locationTo, day, startTime, endTime, statusIndicator };
        // Clear out any old validation errors.
        instance.context.resetValidation();
        // Invoke clean so that newStudentData reflects what will be inserted.
        AllListingsCollection.clean(updatedListData);

        instance.context.validate(updatedListData);

        if (instance.context.isValid()) {
            AllListings.insert(updatedListData);
            instance.messageFlags.set(displayErrorMessages, false);
        } else {
            instance.messageFlags.set(displayErrorMessages, true);
            alert("error");
        }

        console.table(AllListings.find({username: Meteor.user().profile.name}).fetch());

    },
});
