import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Storages from '../Storages';

Meteor.publish('storages', function storages() {
  return Storages.find({ owner: this.userId });
});

// Note: documents.view is also used when editing an existing document.
Meteor.publish('storages.view', function storagesView(storageId) {
  check(storageId, String);
  return Storages.find({ _id: storageId, owner: this.userId });
});
