import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Workers = new Mongo.Collection('Workers');

Workers.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Workers.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

Workers.schema = new SimpleSchema({
  owner: {
    type: String,
    label: 'The ID of the user this document belongs to.',
  },
  createdAt: {
    type: String,
    label: 'The date this document was created.',
    autoValue() {
      if (this.isInsert) return (new Date()).toISOString();
    },
  },
  updatedAt: {
    type: String,
    label: 'The date this document was last updated.',
    autoValue() {
      if (this.isInsert || this.isUpdate) return (new Date()).toISOString();
    },
  },
  workerName: {
    type: String,
    label: 'Worker name.',
  },
  workerLastname: {
    type: String,
    label: 'Worker lastname.',
  },
  workerPosition: {
    type: String,
    label: 'Worker position,',
  },
});

Workers.attachSchema(Workers.schema);

export default Workers;
