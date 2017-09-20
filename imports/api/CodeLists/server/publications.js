import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import CodeLists from '../CodeLists';

Meteor.publish('codelists', function codeList() {
  return CodeLists.find({ owner: this.userId });
});

Meteor.publish('codelists.view', function codelistsView(codelistId) {
  check(codelistId, String);
  return CodeLists.find({ _id: codelistId, owner: this.userId });
});
