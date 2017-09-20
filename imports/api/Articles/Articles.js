import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Articles = new Mongo.Collection('Articles');

Articles.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Articles.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

Articles.schema = new SimpleSchema({
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
  articleName: {
    type: String,
    label: 'Article name.',
  },
  articleDescription: {
    type: String,
    label: 'Article description.',
  },
  articleStandard: {
    type: String,
    label: 'Article standard.',
  },
  articleHeatNumber: {
    type: String,
    label: 'Article heat number.',
  },
  articleQuantity: {
    type: Number,
    label: 'Article quantity.',
  },
  articlePrice: {
    type: Number,
    label: 'Article price.',
  },
  articleTotalValue: {
    type: Number,
    label: 'Article total value.',
  },
  articleQRcode: {
    type: String,
    label: 'Article QR code.',
  },

  articleInvoiceId: {
    type: String,
    label: 'Article invoice id.',
  },
  articleCodeId: {
    type: String,
    label: 'Article code id.',
  },
});

Articles.attachSchema(Articles.schema);

export default Articles;
