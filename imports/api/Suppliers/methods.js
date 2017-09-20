import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Suppliers from './Suppliers';
import rateLimit from '../../modules/rate-limit';
import { generateComponentAsPDF } from '../../modules/server/generate-pdf.js';

import ViewSupplierPDF from '../../ui/pages/ViewSupplierPDF/ViewSupplierPDF';

Meteor.methods({
  'suppliers.insert': function suppliersInsert(supplier) {
    check(supplier, {
      supplierName: String,
      supplierContactPerson: String,
      supplierAddress: String,
      supplierRating: String,
      supplierContactPhone: String,
      supplierContactEmail: String,
    });

    try {
      return Suppliers.insert({ owner: this.userId, ...supplier });
    } catch (exception) {
      throw new Meteor.Error('500', exception);
    }
  },
  'suppliers.update': function suppliersUpdate(supplier) {
    check(supplier, {
      _id: String,
      supplierName: String,
      supplierContactPerson: String,
      supplierAddress: String,
      supplierRating: String,
      supplierContactPhone: String,
      supplierContactEmail: String,
    });

    try {
      const supplierId = supplier._id;
      Suppliers.update(supplierId, { $set: supplier });
      return supplierId; // Return _id so we can redirect to document after update.
    } catch (exception) {
      throw new Meteor.Error('500', exception);
    }
  },
  'suppliers.remove': function suppliersRemove(supplierId) {
    check(supplierId, String);

    try {
      return Suppliers.remove(supplierId);
    } catch (exception) {
      throw new Meteor.Error('500', exception);
    }
  },

  'suppliers.generatePDFSingle': function suppliersGeneratePDFSingle(supplierId) {

    check(supplierId, {
      supplierId: String,

    });

    const supplier = Suppliers.findOne({ _id: supplierId.supplierId });
    const fileName = `supplier_${supplier._id}.pdf`;
    return generateComponentAsPDF({ component: ViewSupplierPDF, props: { supplier }, fileName })
    .then((result) => result)
    .catch((error) => { throw new Meteor.Error('500', error); });

  },

});

rateLimit({
  methods: [
    'suppliers.insert',
    'suppliers.update',
    'suppliers.remove',
    'suppliers.generatePDFSingle',
  ],
  limit: 5,
  timeRange: 1000,
});
