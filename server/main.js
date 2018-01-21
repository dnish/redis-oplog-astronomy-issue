import {Test} from "../imports/test";
import randomstring from 'randomstring';
import { RedisOplog } from 'meteor/cultofcoders:redis-oplog';

const test = new Test({_id:'test',name:'first'});
test.save((e) => {});



Meteor.methods({
    'updateValue': function () {
        const testy = Test.findOne({_id:'test'});
        testy.name = randomstring.generate();
        testy.save();
    }
});


// Redis

RedisOplog.init({
    redis: {
        port: 6379,          // Redis port
        host: '127.0.0.1',   // Redis host
    },
    "mutationDefaults": {
        "optimistic": true,
        "pushToRedis": true
    },
    debug: false, // default is false,
    overridePublishFunction: true // default is true, replaces .publish with .publishWithRedis, set to false if you don't want to override it
});