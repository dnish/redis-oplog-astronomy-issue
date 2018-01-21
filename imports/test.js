import {Class} from 'meteor/jagi:astronomy';
const Tests = new Meteor.Collection("tests");

const Test = Class.create({
    name: 'Test',
    collection: Tests,
    fields: {
        name: {
            type: String
        }
    }
});



export {Test, Tests};