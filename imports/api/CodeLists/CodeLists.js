import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const CodeLists = new Mongo.Collection('Codelists');

CodeLists.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

CodeLists.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

CodeLists.schema = new SimpleSchema({
  owner: {
    type: String,
    label: 'The ID of the user this article belongs to.',
  },
  createdAt: {
    type: String,
    label: 'The date this article was created.',
    autoValue() {
      if (this.isInsert) return (new Date()).toISOString();
    },
  },
  updatedAt: {
    type: String,
    label: 'The date this article was last updated.',
    autoValue() {
      if (this.isInsert || this.isUpdate) return (new Date()).toISOString();
    },
  },
  codeValue: {
    type: String,
    label: 'Code value.',
  },
  codeDescription: {
    type: String,
    label: 'Code description.',
  },

});

CodeLists.attachSchema(CodeLists.schema);

export default CodeLists;
