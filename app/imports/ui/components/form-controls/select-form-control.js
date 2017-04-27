import { Template } from 'meteor/templating';

Template.Select_Form_Control.onRendered(function onRendered() {
  this.$('select.dropdown').dropdown();
});

Template.Select_Form_Control.helpers({
    saveMe() {
        const stuff = [{ label: "Aiea", value: "0" },
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
        const l = [];
        _.map(stuff, function(thing) {
            l.push({label: stuff.label, value: stuff.value, selected: false});
        });

        return l;
    }
});
