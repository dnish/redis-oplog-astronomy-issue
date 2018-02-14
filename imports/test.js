import {Class} from 'meteor/jagi:astronomy';
const Tests = new Meteor.Collection("tests");
import {getRedisPusher, Events, RedisPipe, RedisOplog} from 'meteor/cultofcoders:redis-oplog';

const Test = Class.create({
    name: 'Test',
    collection: Tests,
    fields: {
        name: {
            type: String
        }
    },
    events: {
        afterSave(e) {

            console.log(e.target._id);

            getRedisPusher().publish(`tests::${e.target._id}`, EJSON.stringify({
                [RedisPipe.DOC]: {_id: e.target._id},
                [RedisPipe.EVENT]: Events.UPDATE,
                [RedisPipe.FIELDS]: ['status']
            }));

            getRedisPusher().publish('tests', EJSON.stringify({
                [RedisPipe.DOC]: {_id: e.target._id},
                [RedisPipe.EVENT]: Events.UPDATE,
                [RedisPipe.FIELDS]: ['status']
            }));
        }
    }
});



export {Test, Tests};