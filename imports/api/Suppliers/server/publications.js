import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Suppliers from '../Suppliers';

Meteor.publish('suppliers', function suppliers() {
  return Suppliers.find({ owner: this.userId });
});

Meteor.publish('suppliers.view', function suppliersView(supplierId) {
  check(supplierId, String);
  return Suppliers.find({ _id: supplierId, owner: this.userId });
});
