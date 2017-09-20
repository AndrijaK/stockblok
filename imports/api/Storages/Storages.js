import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Storages = new Mongo.Collection('Storages');

Storages.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Storages.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

Storages.schema = new SimpleSchema({
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
  storageName: {
    type: String,
    label: 'Storage name.',
  },
  storageAbbrevation: {
    type: String,
    label: 'Storage abbrevation.',
  },

  storageState: {
    type: String,
    label: 'Storage state.',
  },
  storageAddress: {
    type: String,
    label: 'Storage Address.',
  },
  storageContactPhone: {
    type: String,
    label: 'Storage contact phone.',
  },
  storageContactEmail: {
    type: String,
    label: 'Storage contact e-mail.',
  },
  storageManager: {
    type: String,
    label: 'Storage manager.',
  },
  storageArticles:{
    type: Array,
    optional: true,
  },
  'storageArticles.$': Object,
  'storageArticles.$.storageId': String,
  'storageArticles.$.articleId': String,
  'storageArticles.$.articleName': String,
  'storageArticles.$.articleDescription': String,
  'storageArticles.$.articleStandard': String,
  'storageArticles.$.articleHeatNumber': String,
  'storageArticles.$.articleQuantity': String,
  'storageArticles.$.articlePrice': String,
});

Storages.attachSchema(Storages.schema);

export default Storages;
