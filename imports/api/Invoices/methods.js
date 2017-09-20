import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Invoices from './Invoices';
import rateLimit from '../../modules/rate-limit';
import { ViewInvoice } from '../../ui/pages/ViewInvoice/ViewInvoice';
import ViewInvoicePDF from '../../ui/pages/ViewInvoicePDF/ViewInvoicePDF';
import { generateComponentAsPDF } from '../../modules/server/generate-pdf.js';

Meteor.methods({
  'invoices.insert': function invoicesInsert(invoice) {
    check(invoice, {
      invoiceSupplier: String,
      invoiceNumber: String,
      invoiceDate: Date,
      invoiceSupplierId: String,
    });

    try {
      return Invoices.insert({ owner: this.userId, ...invoice });
    } catch (exception) {
      throw new Meteor.Error('500', exception);
    }
  },
  'invoices.update': function invoicesUpdate(invoice) {
    check(invoice, {
      _id: String,
      invoiceSupplier: String,
      invoiceNumber: String,
      invoiceDate: Date,
      invoiceSupplierId: String,
    });

    try {
      const invoiceId = invoice._id;
      Invoices.update(invoiceId, { $set: invoice });
      return invoiceId; // Return _id so we can redirect to document after update.
    } catch (exception) {
      throw new Meteor.Error('500', exception);
    }
  },
  'invoices.remove': function invoicesRemove(invoiceId) {
    check(invoiceId, String);

    try {
      return Invoices.remove(invoiceId);
    } catch (exception) {
      throw new Meteor.Error('500', exception);
    }
  },

  'invoices.generatePDFSingle': function invoicesGeneratePDFSingle(invoiceId) {

    check(invoiceId, {
      invoiceId: String,

    });

    const invoice = Invoices.findOne({ _id: invoiceId.invoiceId });
    const fileName = `invoice_${invoice._id}.pdf`;
    return generateComponentAsPDF({ component: ViewInvoicePDF, props: { invoice }, fileName })
    .then((result) => result)
    .catch((error) => { throw new Meteor.Error('500', error); });

  },


});

rateLimit({
  methods: [
    'invoices.insert',
    'invoices.update',
    'invoices.remove',
    'invoices.generatePDFSingle',
  ],
  limit: 5,
  timeRange: 1000,
});
