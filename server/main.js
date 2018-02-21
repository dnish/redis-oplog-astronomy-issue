
import randomstring from 'randomstring';


import {Test, Tests} from "../imports/test";

const test = new Test({_id:'test',name:'first'});
test.save((e) => {});

Meteor.publish("test",() => {
      return Test.find({});
});

Meteor.methods({
    'updateValue': function () {
        const testy = Test.findOne({_id:'test'});
        testy.name = randomstring.generate();
        testy.save();
    }
});

