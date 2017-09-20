import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Invoices = new Mongo.Collection('Invoices');

Invoices.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Invoices.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

Invoices.schema = new SimpleSchema({
  owner: {
    type: String,
    label: 'The ID of the user this invoice belongs to.',
  },
  createdAt: {
    type: String,
    label: 'The date this invoice was created.',
    autoValue() {
      if (this.isInsert) return (new Date()).toISOString();
    },
  },
  updatedAt: {
    type: String,
    label: 'The date this invoice was last updated.',
    autoValue() {
      if (this.isInsert || this.isUpdate) return (new Date()).toISOString();
    },
  },
  invoiceSupplier: {
    type: String,
    label: 'Invoice supplier.',
  },
  invoiceSupplierId: {
    type: String,
    label: 'Invoice supplier id.',
  },
  invoiceNumber: {
    type: String,
    label: 'Invoice number.',
  },
  invoiceDate: {
    type: Date,
    label: 'Invoice date.',
  },

});

Invoices.attachSchema(Invoices.schema);

export default Invoices;
