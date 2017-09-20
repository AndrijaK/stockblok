import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Workers from '../Workers';

Meteor.publish('workers', function workers() {
  return Workers.find({ owner: this.userId });
});

Meteor.publish('workers.view', function workersView(workerId) {
  check(workerId, String);
  return Workers.find({ _id: workerId, owner: this.userId });
});
