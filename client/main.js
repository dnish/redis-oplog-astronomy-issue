import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';
import {Test} from "../imports/test";

Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
});

Template.hello.helpers({
  lastValue() {
    const test = Test.findOne({_id:'test'});

    return (test) ? test.name : "";
  },
});

Template.hello.events({
  'click button'(event, instance) {
    // increment the counter when button is clicked
    Meteor.call("updateValue");
  },
});
