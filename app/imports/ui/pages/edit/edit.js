import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { _ } from 'meteor/underscore';
import { Profiles } from '/imports/api/profile/ProfileCollection';

Template.Edit_Page.onCreated(function onCreated() {
  this.subscribe(Profiles.getPublicationName());
  this.messageFlags = new ReactiveDict();
});

Template.Edit_Page.helpers({

  profiles() {
    return Profiles.findAll();
  },

  capacities() {
    return [
      { label: "1", value: "1" },
      { label: "2", value: "2" },
      { label: "3", value: "3" },
      { label: "4", value: "4" },
      { label: "5", value: "5" },
      { label: "6", value: "6" },
      { label: "7", value: "7" },
      { label: "8", value: "8" },
      { label: "9", value: "9" },
      { label: "10", value: "10" },
    ]
  },

  places(){
    return [
      { label: "Aiea", value: "aiea" },
      { label: "Ewa Beach", value: "ewaBeach" },
      { label: "Hale'iwa", value: "haleiwa" },
      { label: "Hau'ula", value: "hauula" },
      { label: "Hawaii Kai", value: "hawaiiKai" },
      { label: "Honolulu", value: "honolulu" },
      { label: "Ka'a'awa", value: "kaaawa" },
      { label: "Kahala", value: "kahala" },
      { label: "Kahuku", value: "kahuku" },
      { label: "Kailua", value: "kailua" },
      { label: "Kane'ohe", value: "kaneone" },
      { label: "Kapolei", value: "kapolei" },
      { label: "La'ie", value: "laie" },
      { label: "Lanikai", value: "lanikai" },
      { label: "Ma'ili", value: "maili" },
      { label: "Makaha", value: "makaha" },
      { label: "Manoa", value: "manoa" },
      { label: "Mililani", value: "mililani" },
      { label: "Nana Kuli", value: "nanaKuli" },
      { label: "Pearl City", value: "pearlCity" },
      { label: "Wahiawa", value: "wahiawa" },
      { label: "Wai'anae", value: "waianae" },
      { label: "Waikiki", value: "waikiki" },
      { label: "Waimanalo", value: "waimanalo" },
      { label: "Waipahu", value: "waipahu" }
    ]
  }

});

Template.Edit_Page.events({
  'submit .edit-data-form'(event, instance) {
    event.preventDefault();
  },
});

