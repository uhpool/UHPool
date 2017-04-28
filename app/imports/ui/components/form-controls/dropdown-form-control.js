import { Template } from 'meteor/templating';

Template.Dropdown_Form_Control.onRendered(function onRendered() {
  this.$('selection.dropdown').dropdown();
});
