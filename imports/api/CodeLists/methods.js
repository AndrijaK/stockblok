import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import CodeLists from './CodeLists';
import rateLimit from '../../modules/rate-limit';

Meteor.methods({
  'codelists.insert': function codeListsInsert(codelist) {
    check(codelist, {
      codeValue: String,
      codeDescription: String,

    });

    try {
      return CodeLists.insert({ owner: this.userId, ...codelist });
    } catch (exception) {
      throw new Meteor.Error('500', exception);
    }
  },
  'codelists.update': function codeListsUpdate(codelist) {
    check(codelist, {
      _id: String,
      codeValue: String,
      codeDescription: String,
    });

    try {
      const codeId = codelist._id;
      CodeLists.update(codeId, { $set: codelist });
      return codeId;
    } catch (exception) {
      throw new Meteor.Error('500', exception);
    }
  },
  'codelists.remove': function codeListsRemove(codelistId) {
    check(codelistId, String);

    try {
      return CodeLists.remove(codelistId);
    } catch (exception) {
      throw new Meteor.Error('500', exception);
    }
  },

});

rateLimit({
  methods: [
    'codelists.insert',
    'codelists.update',
    'codelists.remove',
  ],
  limit: 5,
  timeRange: 1000,
});
