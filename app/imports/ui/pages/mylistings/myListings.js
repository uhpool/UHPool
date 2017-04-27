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
});

Template.MyListings_Page.events({
    'click .delete'(event, instance) {
        event.preventDefault();
        if(confirm("Do you really want to delete this entry?")) {
            AllListings.remove(FlowRouter.getParam('_id'));
            instance.messageFlags.set(displayErrorMessages, false);
            //FlowRouter.go('MyListings_Page');
        }
    },
    'submit .list-data-form'(event, instance) {
        event.preventDefault();
        /*username: { type: String },
         locationFrom: {type: String},
         locationTo: {type: String},
         day: {type: String},
         startTime: {type: Date},
         endTime: {type: Date},
         statusIndicator: {type: String},*/
        // Get name (text field)
        let user = Meteor.user().profile.name;
        const locFrom = event.target.locationFrom.value;
        const locTo = event.target.locationTo.value;
        const day = event.target.day.value;
        const startTime = event.target.startTime.value;
        const endTime = event.target.endTime.value;
        const indi = AllListings.findOne({username: user}).statusIndicator;

        const updatedListData = { locFrom, locTo, day, startTime, endTime, indi };
        // Clear out any old validation errors.
        instance.context.resetValidation();
        // Invoke clean so that newStudentData reflects what will be inserted.
        AllListingsCollection.clean(updatedListData);
        // Determine validity.
        instance.context.validate(updatedListData);
        if (instance.context.isValid()) {
            AllListings.update(user, { $set: updatedListData });
            instance.messageFlags.set(displayErrorMessages, false);
            alert("gg");
            FlowRouter.go('MyListings_Page');
        } else {
            instance.messageFlags.set(displayErrorMessages, true);
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
            //alert("test");
            //FlowRouter.go('');
        } else {
            instance.messageFlags.set(displayErrorMessages, true);
            alert("error");
        }

        console.table(AllListings.find({username: Meteor.user().profile.name}).fetch());

    },
});
